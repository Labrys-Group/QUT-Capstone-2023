import { Contract } from 'ethers'

const getTotalSupply = async (erc721: Contract) => {
  try {
    const totalBalance = await erc721.totalSupply()
    return totalBalance.toNumber()
  } catch {
    return -221210
  }
}

export default getTotalSupply
