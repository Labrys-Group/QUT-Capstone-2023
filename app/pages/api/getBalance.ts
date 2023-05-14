// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import { abi, address as ad } from '../../constants/AccessTicket'
import { AccessTicket } from '@/constants/typechain-types'

type Data = {
  totalSupply: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://goerli.infura.io/v3/eb15470ba306470585f45d0ce1da3f67'
    )
    const contractAddress = ad
    const contractABI = abi

    const contract = new ethers.Contract(contractAddress, contractABI, provider)

    const totalSupply = await contract.totalSupply()

    console.log(
      `The contract at address ${contractAddress} has ${totalSupply} tokens.`
    )
    res.status(200).json({
      totalSupply: totalSupply.toString(),
    })
  } catch {
    res.status(500).json({
      totalSupply: '',
    })
  }
}
