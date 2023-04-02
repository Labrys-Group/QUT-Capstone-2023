import { ethers } from "hardhat";

// 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

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
