import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  console.log("hopefully this runs");

  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;

  //const [deployer] = await ethers.getSigners();
  const { deployer } = await getNamedAccounts();

  await deploy("AccessTicket", {
    from: deployer,
    args: ["Access Ticket", "TICKET"],
    log: true,
  });
};
export default func;
