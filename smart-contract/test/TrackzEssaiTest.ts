import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TrackzEssai", () => {
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();
    const TrackzEssai = await ethers.getContractFactory("TrackzEssai");
    const contract = await TrackzEssai.deploy();
    return { contract, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("Should set the right base uri", async () => {
      const { contract } = await loadFixture(deployContract);
      expect(await contract.uri("1")).to.equal(
        "https://trackz.vercel.app/api/trackzs/1"
      );
    });

    it("Should set the right owner", async () => {
      const { contract, owner } = await loadFixture(deployContract);
      expect(await contract.owner()).to.equal(owner.address);
    });
  });
});
