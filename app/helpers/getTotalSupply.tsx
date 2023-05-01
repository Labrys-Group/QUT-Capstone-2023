import { Contract } from "ethers";

const getTotalSupply = async (erc721: Contract) => {
  const totalBalance = await erc721.totalSupply();
  return totalBalance.toNumber();
};

export default getTotalSupply;
