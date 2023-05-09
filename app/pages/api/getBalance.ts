// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { abi, address as ad } from "../../constants/AccessTicket";
import { AccessTicket } from "@/constants/typechain-types";

type Data = {
  userBalance: string;
  totalSupply: string;
  tokenId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/eb15470ba306470585f45d0ce1da3f67"
    );
    const contractAddress = ad;
    const contractABI = abi;

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const address = req.body.address;

    const balance = await contract.balanceOf(address);
    const totalSupply = await contract.totalSupply();

    if (balance == 1) {
      var tokenId = await contract.tokenOfOwnerByIndex(address, 0);
      console.log(`Account ${address} owns token ${tokenId}`);
    } else {
      tokenId = "null";
    }

    console.log(`Address ${address} has ${balance} ERC721 tokens.`);
    console.log(
      `The contract at address ${contractAddress} has ${totalSupply} tokens.`
    );
    res.status(200).json({
      userBalance: balance.toString(),
      totalSupply: totalSupply.toString(),
      tokenId: tokenId.toString(),
    });
  } catch {
    res.status(500).json({
      userBalance: "",
      totalSupply: "",
      tokenId: "",
    });
  }
}
