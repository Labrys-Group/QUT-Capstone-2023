import type { NextApiRequest, NextApiResponse } from "next";
type Data = {};
require("dotenv").config();

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //query db
  try {
    const fetchClubsfromDb = async () => {
      const response = await fetch(
        `https://qut-capstone-2023.vercel.app/api/useDatabase?type=club`
      );
      const data = await response.json();
      return data;
    };

    const dbData = await fetchClubsfromDb();
    console.log("db", dbData);

    // query alchemy api to get owned nfts
    const apiKey = "o13ZJRrEu85G8Zi9lb9KxaZhkv6537H7";
    const baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`;
    const address = req.query.address;
    let contracts = [];

    for (const data of dbData) {
      contracts.push(data.address);
    }

    let query = contracts.join("&contractAddresses[]=");
    query = "&contractAddresses[]=" + query;

    const url = `${baseURL}/getNFTs/?owner=${address}` + query;
    var requestOptions: RequestInit = {
      method: "get",
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return res.status(200).json({ clubs: dbData, owned: data });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
