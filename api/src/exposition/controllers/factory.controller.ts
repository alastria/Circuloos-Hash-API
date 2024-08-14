
import { Request } from "express";
import AppResult from "../../types/AppResult.type";
import Logger from "../../helpers/logger.helper";
import Config from "../../types/Config.type";

let config: Config;
let logger: Logger;

export async function updateHashes(req: Request): Promise<AppResult> {
  const data = req.body;
}

export default function initContractController(_logger: Logger, _config: Config) {
  logger = _logger;
  config = _config;
}