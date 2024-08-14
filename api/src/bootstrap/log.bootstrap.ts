import Logger from "../helpers/logger.helper";
import Config from "../types/Config.type";

export function startLogger(config: Config, logger: Logger) {
  logger.changeAppName(config.SERVICE_NAME);
  logger.changeLogLevels(
    config.LOG_LEVELS.LOG_LEVEL_SYSTEM,
    config.LOG_LEVELS.LOG_LEVEL_FILE
  );
}
