import dotenvx from "@dotenvx/dotenvx";
import { startDefaultLogger, logger } from "./helpers/logger.helper";
import { initContractsService } from "./services/contracts.service";
import { loadAllContracts } from "./bootstrap/contract.bootstrap";
import { initConfig } from "./bootstrap/config.bootstrap";
import { startLogger } from "./bootstrap/log.bootstrap";

import initContractController from "./exposition/controllers/contract.controller";
import api from "./exposition/api/api";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * Initialize the application
 */
async function startApp() {
  dotenvx.config();
  startDefaultLogger();

  logger.info("STARTING APPLICATION");

  try {
    // BOOTSTRAPPING
    logger.info("BOOTSTRAPING APPLICATION");
    const config = initConfig(process.env.CONFIG || "config.yaml");
    startLogger(config, logger);
    const contracts = await loadAllContracts(config, logger);

    logger.info('INITIALIZING CONTROLLERS');
    initContractController(logger, config);

    logger.info(`INITIALIZING SERVICES`);
    initContractsService(logger, contracts, config);

    // API
    logger.info("STARTING API EXPOSITION");
    api(config, logger);

    return 0;
  } catch (error: any) {
    logger.error(error);
    throw error;
  }
}

module.exports = startApp();
