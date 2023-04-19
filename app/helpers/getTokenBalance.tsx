import { Contract } from "ethers";

const getTokenBalance = async (erc721: Contract, address: string) => {
  const coinBalance = await erc721.balanceOf(address);
  return coinBalance.toNumber();
};

export default getTokenBalance;
