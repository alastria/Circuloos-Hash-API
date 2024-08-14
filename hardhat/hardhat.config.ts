/** @type import('hardhat/config').HardhatUserConfig */
import "@nomicfoundation/hardhat-ethers";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
      },
      // Version of the EVM to compile for.
      // Affects type checking and code generation. Can be homestead,
      // tangerineWhistle, spuriousDragon, byzantium, constantinople,
      // petersburg, istanbul, berlin, london, paris, shanghai or cancun (default)
      evmVersion: "berlin",
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  networks: {
    redB: {
      url: process.env.NETWORK_URL,
      accounts: [process.env.NETWORK_WALLET_PRIV_KEY]
    },
  },
};
