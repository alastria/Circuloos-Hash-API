import { BaseContract, ContractFactory } from "ethers";

import hre from "hardhat";
import fs from "fs";

const contractsToDeploy: string[] = [
  "HashStorageFactory"
]

const addresses: {[key: string]: string} = {};

function storeAddressInfo(contractName: string, address: string) {
  addresses[contractName] = address;
}

function saveAddressInfo(network: string) {
  fs.writeFileSync(`addresses-${network}.json`, JSON.stringify(addresses));
}

async function main() {
  for (const contractName of contractsToDeploy) {
    const factory: ContractFactory = await hre.ethers.getContractFactory(contractName);
    const params: string | undefined = process.env[`${contractName}_CONSTRUCTOR_PARAMS`] || "[]";
    const paramsParsed: string[] = JSON.parse(params);
    
    console.log(`Deploying contract ${contractName} with parameters: ${params}...`);
    const deployResponse: BaseContract = await factory.deploy(...paramsParsed);
    console.log(`Contract ${contractName} deployed successfully!`);
    storeAddressInfo(contractName, await deployResponse.getAddress());
  }

  console.log(`Saving contract addresses for ${hre.network.name}`);
  saveAddressInfo(hre.network.name);
  console.log(`Addresses saved! Deploy successful!`);
}

main();