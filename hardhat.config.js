/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// import 'hardhat';
require('@nomicfoundation/hardhat-ethers')
require('@openzeppelin/hardhat-upgrades')
require('@nomicfoundation/hardhat-verify')

require('dotenv/config')

module.exports = {
  solidity: {
    version: '0.8.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: 'https://rpc2.sepolia.org',
      accounts: [`0x${process.env.SIGNER}`],
    },
    // mainnet: {
    //   url: 'https://eth.llamarpc.com',
    //   accounts: [`0x${process.env.SIGNER}`],
    // },
  },
  etherscan: {
    apiKey: process.env.VERIFICATION_KEY,
  },
  sourcify: {
    enabled: true,
  },
}
