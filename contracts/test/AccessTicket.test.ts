import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

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
      .mint({ value: ethers.utils.parseEther("0.01") });

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

  it("should revert if user already owns a token", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.01") });

    await expect(
      accessTicket
        .connect(user1)
        .mint({ value: ethers.utils.parseEther("0.01") })
    ).to.be.revertedWith("AccessTicket: User already owns a token");
  });

  it("should remove a token and verify ownership", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.01") });

    await expect(
      accessTicket.connect(user1).removeTicket(1)
    ).to.be.revertedWith("ERC721: invalid token ID");

    await expect(accessTicket.ownerOf(1)).to.be.revertedWith(
      "ERC721: owner query for nonexistent token"
    );
  });

  it("should revert if caller is not the ticket owner", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.01") });

    await expect(
      accessTicket.connect(user2).removeTicket(1)
    ).to.be.revertedWith("AccessTicket: caller is not the ticket owner");
  });

  it("should withdraw funds to owner", async function () {
    await accessTicket
      .connect(user1)
      .mint({ value: ethers.utils.parseEther("0.01") });
    await accessTicket.connect(owner).withdrawFunds();

    expect(await ethers.provider.getBalance(accessTicket.address)).to.equal(0);
    expect(await ethers.provider.getBalance(owner.address)).to.be.above(
      ethers.utils.parseEther("0.01")
    );
  });
});
