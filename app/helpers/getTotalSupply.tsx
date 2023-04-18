import { Contract } from "ethers";

const getTotalSupply = async (erc20: Contract) => {
  const totalBalance = await erc20.totalSupply();
  return totalBalance.toNumber();
};

export default getTotalSupply;