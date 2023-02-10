const alchemy_api_url = process.env.alchemy_api_url;
const alchemy_api_key = process.env.alchemy_api_key;
const wallet_private_key = process.env.wallet_private_key;
const contract_address = process.env.contract_address;

const { ethers, network } = require("hardhat");
const hre = require("hardhat");

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json"); //interface

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network.name, alchemy_api_key);

// signer - Agent
const signer = new ethers.Wallet(wallet_private_key, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(contract_address, contract.abi, signer);

async function main() {
  // get the public variable from the smart contract
  var message = await helloWorldContract.message();
  console.log(`The message is : ${message}`);

  console.log("updating the message...");
  const tx = await helloWorldContract.update("Here we go again!");
  await tx.wait();

  message = await helloWorldContract.message();
  console.log(`The message is : ${message}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
