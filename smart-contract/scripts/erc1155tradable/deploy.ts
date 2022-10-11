import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ERC1155Tradable = await ethers.getContractFactory("BAE");
  const contract = await ERC1155Tradable.deploy(
    // "BAE-Test",
    // "bae",
    "0x56150dB289BeF563De0018Fe43abF8dCF1725F3e"
  );

  console.log("ERC1155Tradable address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
