
import { Request } from "express";
import { ContractTransactionResponse, ContractTransactionReceipt, ZeroAddress } from "ethers";

import { callContractMethod, executeContractMethod } from "../../services/contracts.service";

import AppResult from "../../types/AppResult.type";
import Logger from "../../helpers/logger.helper";
import Config from "../../types/Config.type";
import ContractNotFoundException from "../../types/exceptions/ContractNotFound.exception";
import TenantContractNotFoundException from "../../types/exceptions/TenantContractNotFound.exception";

let config: Config;
let logger: Logger;

export async function createHashesController(req: Request): Promise<AppResult> {
  const contractName: string = config.CONTRACT.NAME;
  const contractAddress: string = config.CONTRACT.ADDRESS;
  const createMethod: string = "createStorage";
  const deployedContractsMethod: string = "deployedContracts";
  const tenantContractName: string = "HashStorage";
  const tenantStoreMethod: string = "store";
  const data = req.body;
  const date = data.dateTime ? new Date(data.dateTime) : new Date();
  const unixTimestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const result: any = {
    dateTime: data.dateTime,
    timestamp: unixTimestamp,
    addresses: {},
    hashes: {}
  };

  for (let key of Object.keys(data)) {
    if (key === "dateTime") continue;

    let value = data[key];
    let address = await callContractMethod(contractName, contractAddress, deployedContractsMethod, [key], {});

    if (address == ZeroAddress) {
      logger.debug("Creating contract from factory.")
      const txResult: ContractTransactionResponse | ContractTransactionReceipt | null = await executeContractMethod(contractName, contractAddress, createMethod, [key], {});
      
      if (txResult instanceof ContractTransactionReceipt) {
        if (txResult.logs.length > 0) {
          address = txResult.logs[0].address;
        } else {
          address = await callContractMethod(contractName, contractAddress, deployedContractsMethod, [key], {});
        }
      }
    }
    
    if (address != ZeroAddress) {
      logger.debug("Calling contract to store.");
      await executeContractMethod(tenantContractName, address, tenantStoreMethod, [{unixTimestamp: unixTimestamp, storedHash: value}], {});
      result.hashes[key] = value;
    }

    result.addresses[key] = address;
  }

  return {
    statusCode: 201,
    body: {
      message: "Created the hashes for each tenant.",
      result
    }
  }
}

export async function getHashController(req: Request): Promise<AppResult> {
  const tenantId: string = req.params.tenantId;
  const contractName: string = config.CONTRACT.NAME;
  const contractAddress: string = config.CONTRACT.ADDRESS;
  const methodName: string = "deployedContracts";
  const tenantContractName: string = "HashStorage";
  const tenantContractMethod: string = "retrieve";

  let address = await callContractMethod(contractName, contractAddress, methodName, [tenantId], {});

  if (address == ZeroAddress) {
    throw new TenantContractNotFoundException(tenantId);
  }

  const result = await callContractMethod(tenantContractName, address, tenantContractMethod, [], {});

  return {
    statusCode: 200,
    body: {
      message: `Retrieved the latest hash for the tenant ${tenantId}.`,
      result
    }
  }
}

export async function getHashByUnixTimestampController(req: Request): Promise<AppResult> {
  const tenantId: string = req.params.tenantId;
  const unixTimestamp: string = req.params.unixTimestamp;
  const contractName: string = config.CONTRACT.NAME;
  const contractAddress: string = config.CONTRACT.ADDRESS;
  const methodName: string = "deployedContracts";
  const tenantContractName: string = "HashStorage";
  const tenantContractMethod: string = "storedHashes";

  let address = await callContractMethod(contractName, contractAddress, methodName, [tenantId], {});

  if (address == ZeroAddress) {
    throw new TenantContractNotFoundException(tenantId);
  }

  let date;
  if (Number.isNaN(unixTimestamp)) {
    date = new Date(unixTimestamp);
  } else {
    date = new Date(Number(unixTimestamp));
  }

  const unixTrimmed = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const result = await callContractMethod(tenantContractName, address, tenantContractMethod, [unixTrimmed], {});

  return {
    statusCode: 200,
    body: {
      message: `Retrieved the hash with timestamp ${unixTimestamp} for the tenant ${tenantId}.`,
      result
    }
  }
}

export default function initFactoryController(_logger: Logger, _config: Config) {
  logger = _logger;
  config = _config;
}