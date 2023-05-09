import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const apiKey = 'o13ZJRrEu85G8Zi9lb9KxaZhkv6537H7'
  const baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`
  const address = '0xe5CA461cF9FF63143dE899d1Af8AE112eF6850CA'
  const contracts = [
    '0x137725783730b71dfdbd54eaac637d3148f40f12',
    '0x137725783730b71dfdbd54eaac637d3148f40f12',
  ]

  let query = contracts.join('&contractAddresses[]=')
  query = '&contractAddresses[]=' + query

  const url = `${baseURL}/getNFTs/?owner=${address}` + query

  console.log(query)

  var requestOptions = {
    method: 'get',
    redirect: 'follow',
  }

  try {
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
