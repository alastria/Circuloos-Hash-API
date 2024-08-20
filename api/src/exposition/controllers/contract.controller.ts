import { ContractTransactionReceipt, ContractTransactionResponse, Overrides, TransactionRequest } from "ethers";
import { Request } from "express";

import { callContractMethod, executeContractMethod } from "../../services/contracts.service";
import AppResult from "../../types/AppResult.type";
import Logger from "../../helpers/logger.helper";
import Config from "../../types/Config.type";

let config: Config;
let logger: Logger;

export async function callContractMethodController(req: Request): Promise<AppResult> {
  const contractName: string = req.params.contract;
  const contractAddress: string = req.params.address;
  const methodName: string = req.params.method;
  const args: any[] = req.body.args || [];
  const options: Overrides = req.body.options || {};

  const result: any = await callContractMethod(contractName, contractAddress, methodName, args, options);

  return {
    statusCode: 200,
    body: {
      message: 'Success',
      result
    }
  };
}

export async function executeContractMethodController(req: Request): Promise<AppResult> {
  const contractName: string = req.params.contract;
  const contractAddress: string = req.params.address;
  const methodName: string = req.params.method;
  const args: any[] = req.body.args || [];
  const options: Overrides = req.body.options || {};

  const result: ContractTransactionResponse | ContractTransactionReceipt | null = await executeContractMethod(contractName, contractAddress, methodName, args, options);

  return {
    statusCode: 201,
    body: {
      message: result instanceof ContractTransactionReceipt ? 'Transaction executed' : 'Transacion processed',
      result
    }
  }
}

export default function initContractController(_logger: Logger, _config: Config) {
  logger = _logger;
  config = _config;
}