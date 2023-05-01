# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Draft

## Develop the contract

After you finished the contract, you need to compile the contract first, make sure you have the solidity compiler on the environment and the matched version in each file.

Current Solidity Version: 0.8.18

Install Hardhat to compile the contract

```sh
npm install dotenv @openzeppelin/contracts
npm install --save-dev typescript ts-node @types/node
npx hardhat compile
npx hardhat test
```

Smart Contract Deployment

```sh
npx hardhat deploy --network goerli deploy/001.ts
npx hardhat verify --network goerli <address> 
```
