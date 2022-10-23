import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

import "./tasks/testing-task";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.9" },
      { version: "0.5.12" },
      // { version: "0.8.0" },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.GOERLI_RPC_URI,
      accounts: [
        process.env.GOERLI_PRIVATE_KEY!,
        // process.env.GOERLI_PRIVATE_KEY_NO_PERMISSION!,
      ],
    },
  },
};

export default config;
