require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-etherscan");

const { alchemy_api_url, wallet_private_key } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",

  networks: {
    hardhat: {},
    goerli: {
      url: alchemy_api_url,
      accounts: [`0x${wallet_private_key}`],
    }
  }
};
