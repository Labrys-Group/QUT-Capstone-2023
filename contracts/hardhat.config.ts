import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";

import "@nomicfoundation/hardhat-toolbox";
require('hardhat-deploy');
require('dotenv').config();
const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  // defaultNetwork: "goerli",
   networks: {
      goerli: {
        chainId: 5,
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
};

export default config;
