import { ethers } from "hardhat";

async function main() {
  // Deploy the AccessTicket contract
  const AccessTicketContract = await ethers.getContractFactory("AccessTicket");
  const accessTicket = await AccessTicketContract.deploy(
    "Access Ticket",
    "TICKET",
    {}
  );
  await accessTicket.deployed();
  console.log(`AccessTicket deployed to: ${accessTicket.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
