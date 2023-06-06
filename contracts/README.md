# Hardhat Sample Project

This repository showcases the fundamental usage of Hardhat through a sample contract, its corresponding test, and a script that deploys the contract.

Try executing some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Smart Contract Guide for Members Only

This project demonstrates the implementation of a basic ERC721 usage. It caters to user operations aligning with the "Members Only" purpose. Additionally, the procedures for deploying and testing the smart contract are also pre-set. Below are the detailed commands for these steps.

## Installation

To develop or run the smart contract, install the necessary libraries with the following commands:

```shell
npm install hardhat
npm install dotenv @openzeppelin/contracts
npm install --save-dev typescript ts-node @types/node
```

Current Solidity Version: 0.8.18

**Note:** Be mindful that the solidity version in Hardhat can cause version conflicts with other packages or libraries.

## Development

Post development, you need to compile the contract. Ensure that the solidity compiler in the environment matches the version in each file. Use the following commands to compile and test:

```shell
npx hardhat compile
npx hardhat test
```

## Deployment

After successful testing, deploy the smart contract to the Goerli test network for demonstration. Before running the deployment command, ensure the Goerli account configuration for the project is correct. The configuration details can be found in ./contracts/hardhat.config.ts. The file to run is located at ./contracts/deploy/001_deploy_access_ticket.

```shell
npx hardhat deploy --network goerli
```

## Verification

Execute the following command to verify the contract on Etherscan, allowing visitors to view the source code and interact with the smart contract functions. Direct links to the contracts on Etherscan are provided below:

```shell
npx hardhat verify --network goerli <address> <name> <symbol>
```

- [EXY United](https://goerli.etherscan.io/address/0x18b0a06cd63d1641467Ed5B1021e0B9a4A6D9245#code)
- [Steve Climbing Gym](https://goerli.etherscan.io/address/0xd00564BF5Ad93B090fE4a09a3Bb337117070b98D#code)
- [Table Tennis](https://goerli.etherscan.io/address/0xCA25Ab93cFEAACe58840C35e25829b5A1a926e07#code)

```shell
npx hardhat verify --network goerli 0x18b0a06cd63d1641467Ed5B1021e0B9a4A6D9245 "exy" "EXY"
npx hardhat verify --network goerli 0xd00564BF5Ad93B090fE4a09a3Bb337117070b98D "climbing" "climbing"
npx hardhat verify --network goerli 0xCA25Ab93cFEAACe58840C35e25829b5A1a926e07 "tableTennis" "tableTennis"
```

## Git Operations

The following Git commands may be useful during development:

- Update branch

```sh
git pull origin main
git add .
git commit -m "merge from main"
git push
```

- Create branch

```sh
git checkout -b stone
```

```sh
git branch stone
git checkout stone
```

- Check git log

```sh
git log
```

- Stash

```sh
git stash
```
