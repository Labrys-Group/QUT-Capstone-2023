import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, utils } from "ethers";

// test command: npx hardhat test test/MembersOnly.test.ts

describe("AccessTicket", function () {
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let accessTicket: Contract;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const AccessTicket = await ethers.getContractFactory("AccessTicket");
    accessTicket = (await AccessTicket.deploy(
      "Access Ticket",
      "TICKET"
    )) as Contract;
    await accessTicket.deployed();
  });

  it("should mint a new token and verify ownership", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: utils.parseEther("0.0000000001") });

    const ownerOfToken = await accessTicket.ownerOf(1);
    expect(ownerOfToken).to.equal(user1.address);

    const balanceOfUser = await accessTicket.balanceOf(user1.address);
    expect(balanceOfUser).to.equal(1);

    const tokenIdsOfUser = [];
    for (let i = 0; i < balanceOfUser; i++) {
      const tokenId = await accessTicket.tokenOfOwnerByIndex(user1.address, i);
      tokenIdsOfUser.push(tokenId);
    }
    expect(tokenIdsOfUser).to.deep.equal([1]);
  });

  it("should return the price for the ticket", async function () {
    const ticketPrice = await accessTicket.readTicketPrice();
    const expectedPriceInWei = ethers.BigNumber.from("100000000"); // 0.0000000001 Ether in Wei
    expect(ticketPrice).to.equal(expectedPriceInWei);
  });

  it("should revert if user already owns a token", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.0000000001") });

    await expect(
      accessTicket
        .connect(user1)
        .mint({ value: ethers.utils.parseEther("0.0000000001") })
    ).to.be.revertedWith("AccessTicket: User already owns a token");
  });

  it("should get tokenURI", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.0000000001") });

    let result = await accessTicket.connect(user1).tokenURI(1);
    expect(result).to.equal("http://localhost.com:3000/1");
  });

  it("should verify ownership", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.0000000001") });

    await accessTicket
      .connect(user2)
      .mint({ value: ethers.utils.parseEther("0.0000000001") });

    let result = await accessTicket
      .connect(user1)
      .verifyAccess(user1.address, 1);
    expect(result).to.equal(true);

    let result_error = await accessTicket
      .connect(user1)
      .verifyAccess(user1.address, 2);
    expect(result_error).to.equal(false);
  });

  it("should remove a token and verify ownership", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.0000000001") });

    await accessTicket.connect(user1).removeTicket(1);

    await expect(
      accessTicket.connect(user1).removeTicket(1)
    ).to.be.revertedWith("ERC721: token does not exist");
  });

  it("should revert if caller is not the ticket owner", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.0000000001") });

    await expect(
      accessTicket.connect(user2).removeTicket(1)
    ).to.be.revertedWith("AccessTicket: caller is not the ticket owner");
  });

  it("should withdraw funds to owner", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.0000000001") });
    await accessTicket.connect(owner).withdrawFunds();

    expect(await ethers.provider.getBalance(accessTicket.address)).to.equal(0);
    expect(await ethers.provider.getBalance(owner.address)).to.be.above(
      ethers.utils.parseEther("0.0000000001")
    );
  });
});
