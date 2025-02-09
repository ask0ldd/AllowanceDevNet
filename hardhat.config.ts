import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import process from 'node:process';

process.loadEnvFile('.env');

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 31337,
      /*accounts: {
        mnemonic: process.env.MNEMONIC || ""
      }*/
    },
    holesky: {
      url: process.env.HOLESKY_RPC_URL,
      accounts: [process.env.HOLESKY_PRIVATE_KEY as string]
    }
  }
};

export default config;

/*

module.exports = {
  networks: {
    devnet: {
      url: "YOUR_DEVNET_JSON_RPC_URL",
      chainId: 1,
    },
  },
};

*/