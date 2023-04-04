import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";

import "@nomicfoundation/hardhat-toolbox";
require("hardhat-deploy");
require("dotenv").config();
const { API_URL, PRIVATE_KEY, ETHERSCAN_API } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  // defaultNetwork: "goerli",
  networks: {
    goerli: {
      chainId: 5,
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
  namedAccounts: {
    deployer: 0,
    alice: 1,
    bob: 2,
    carol: 3,
  },
};

export default config;
