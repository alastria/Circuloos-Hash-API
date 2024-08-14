import fs from "fs";

import Config from "../types/Config.type";
import Logger from "../helpers/logger.helper";
import ContractsFile from "../types/ContractsFile.type";
import ContractCollection from "../types/ContractCollection.type";

export async function loadAllContracts(config: Config, logger: Logger): Promise<ContractCollection> {
  logger.info(`Loading contract file from ${config.CONTRACTS_FILE}...`);
  var contractsFile: ContractsFile = JSON.parse(fs.readFileSync(config.CONTRACTS_FILE, 'utf-8'));
  
  logger.info(`Loading ${contractsFile.contracts.length} contracts...`);

  const contracts: ContractCollection = {};
  for (const contract of contractsFile.contracts) {
    contracts[contract.name] = contract;
  }

  logger.info(`Loaded ${contractsFile.contracts.length} contracts successfully.`);
  return contracts;
}