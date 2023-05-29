// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbHandlerFactory } from '../../helpers/databaseMethods'
import { UserModel } from '../../models/User'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const uri =
  'mongodb+srv://admin:PpuXdMSNaIuX4mVp@membersonly.dr0rpdo.mongodb.net/?retryWrites=true&w=majority'

const getUserWallets = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const users = await UserModel.find({}).lean()
  res.status(200).json({ users })
}

const addUserWallet = async (
  req: NextApiRequest, // req.query = parameters in the URL
  res: NextApiResponse<any>
) => {
  const user = UserModel.create({
    walletAddress: '0x76543456789',
    userName: 'please work',
  })
  const users = await UserModel.find({}).lean()

  res.status(200).json({ users })
}

const handler = dbHandlerFactory(uri).get(getUserWallets).post(addUserWallet)

export default handler
