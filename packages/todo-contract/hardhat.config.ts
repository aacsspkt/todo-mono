import '@nomicfoundation/hardhat-toolbox';

import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSC_API_KEY || "",
    },
    customChains: [],
  },
  networks: {
    bsc_test: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  mocha: {
    timeout: 1000000,
  },
};

export default config;
