import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO: move this to env file
  const apiKey = 'o13ZJRrEu85G8Zi9lb9KxaZhkv6537H7'
  const baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`
  const address = '0xe5CA461cF9FF63143dE899d1Af8AE112eF6850CA'
  const contracts = ['0x137725783730B71DFDBD54eAaC637d3148f40F12']

  let query = contracts.join('&contractAddresses[]=')
  query = '&contractAddresses[]=' + query

  const url = `${baseURL}/getNFTs/?owner=${address}` + query
  var requestOptions: RequestInit = {
    method: 'get',
    redirect: 'follow',
  }

  try {
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
