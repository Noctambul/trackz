import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import ERC1155TradableAbi from "../../artifacts/contracts/v0.5/ERC1155Tradable.sol/ERC1155Tradable.json";

dotenv.config();

async function main() {
  // const [signer] = await ethers.getSigners();
  const provider = ethers.providers.getDefaultProvider("goerli");
  const contract = new ethers.Contract(
    process.env.GOERLI_CONTRACT_ADDRESS_BAE!,
    JSON.stringify(ERC1155TradableAbi.abi),
    provider
  );

  console.log("Contract retrieved");

  const id = 2;
  console.log("Owner:", await contract.owner());
  console.log("Creators:", await contract.creators(id));
  console.log("Token supply:", await contract.totalSupply(id));
  console.log("Uri:", await contract.uri(id));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
