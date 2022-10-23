import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TrackzEssai", () => {
  async function deployContract() {
    // const amount = 1_000_000_000;
    const [owner, otherAccount] = await ethers.getSigners();
    const TrackzEssai = await ethers.getContractFactory("TrackzEssai");
    const contract = await TrackzEssai.deploy();
    await contract.deployed();
    return { contract, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("Should set the right base uri", async () => {
      const { contract } = await loadFixture(deployContract);
      expect(await contract.uri("1")).to.equal(
        "https://trackz.vercel.app/api/trackzs/{id}"
      );
    });

    it("Should set the right owner", async () => {
      const { contract, owner } = await loadFixture(deployContract);
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", () => {
    it("Should emit TrackzCreated events", async () => {
      const { contract, owner } = await loadFixture(deployContract);
      const mintTx = await contract.create("Test Trackz", 12, {
        value: ethers.utils.parseEther("1"),
      });
      await expect(mintTx)
        .to.emit(contract, "TrackzCreated")
        .withArgs(0, 12, "Test Trackz", owner.address);
    });

    it("Can be call from any addresses", async () => {
      const { contract, otherAccount } = await loadFixture(deployContract);
      expect(
        await contract.connect(otherAccount).create("Trackz", 22)
      ).to.(contract, "otherAccount", 55);
    });
  });
});
