import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import Abi from "../../artifacts/contracts/v0.5/BAE.sol/BAE.json";

dotenv.config();

async function main() {
  const [minter] = await ethers.getSigners();
  console.log("Miniting on contract:", process.env.GOERLI_CONTRACT_ADDRESS_BAE);
  console.log("Minting with the account:", minter.address);
  const contract = new ethers.Contract(
    process.env.GOERLI_CONTRACT_ADDRESS_BAE!,
    JSON.stringify(Abi.abi),
    minter
  );

  console.log("Contract retrieved");

  // const mintTx = await contract.create(
  //   minter.address,
  //   12,
  //   "https://trackz.vercel.app/api/trackzs/{id}",
  //   ethers.utils.formatBytes32String(JSON.stringify({ hello: "world" }))
  // );
  const mintTx = await contract.create(
    12,
    "Testing Name",
    "https://trackz.vercel.app/api/trackzs/{id}",
    ethers.utils.formatBytes32String(JSON.stringify({ hello: "world" }))
  );
  console.log("Mint Transaction:", mintTx);

  await mintTx.wait();
  console.log("Minted !");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
