import type { NextApiRequest, NextApiResponse } from "next";
type Data = {};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const contractAddress = req.body.contract;
  // TODO: move this to env file
  const apiKey = "o13ZJRrEu85G8Zi9lb9KxaZhkv6537H7";
  const baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`;
  const address = "0x2F44998bdfB94F770Ae756ddC9C47C32DEa168df";
  const contracts = ["0x891E5d95bdc7CD975DFAf87bA228685750D159Ec"];

  let query = contracts.join("&contractAddresses[]=");
  query = "&contractAddresses[]=" + query;

  const url = `${baseURL}/getNFTs/?owner=${address}` + query;
  var requestOptions: RequestInit = {
    method: "get",
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
