import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

type Data = {
  totalSupply: string;
};

// get totalSupply of contracts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/eb15470ba306470585f45d0ce1da3f67"
    );

    const contractAddress = req.body.contract;
    const contractABI = req.body.abi;

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const totalSupply = await contract.totalSupply();

    res.status(200).json({
      totalSupply: totalSupply.toString(),
    });
  } catch (e) {
    res.status(500).json({
      totalSupply: "",
    });
  }
}
