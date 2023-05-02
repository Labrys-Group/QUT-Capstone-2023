import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";

import "@nomicfoundation/hardhat-toolbox";
require("hardhat-deploy");
require("dotenv").config();

// console.log(process.env.PRIVATE_KEY);

var API_URL =
  "https://eth-goerli.g.alchemy.com/v2/o13ZJRrEu85G8Zi9lb9KxaZhkv6537H7";
var PRIVATE_KEY =
  "b449eb30e00762da3614fba22c47e176c2a6c440478412533f4a7c99ad98ae46";
var ETHERSCAN_API = "1NC98FXI1IMKN7E2NWKU5HDG15JCNC7C5U";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
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
