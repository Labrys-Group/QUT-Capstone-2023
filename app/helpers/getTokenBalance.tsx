import { Contract } from "ethers";

const getTokenBalance = async (erc20: Contract, address: string) => {
	const coinBalance = await erc20.balanceOf(address);
	return coinBalance.toNumber();
};

export default getTokenBalance;