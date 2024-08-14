import log4js from "log4js";

const DEFAULT_LOGGER_NAME = "Default";
const DEFAULT_LAYOUT = {
  type: "pattern",
  pattern:
    "%X{appId}[%d{yyyy-MM-dd hh:mm:ss}] [%p] - %m",
};

export default class Logger {
  private logger: log4js.Logger;
  private logLevel: string = 'trace';
  private logFileLevel: string = 'info';

  constructor(
    name: string = DEFAULT_LOGGER_NAME,
    logLevel: string = "trace",
    logFileLevel: string = "info"
  ) {
    this.configureLog4js(logLevel, logFileLevel);
    this.logger = log4js.getLogger(name);
    this.logger.addContext("appId", `[${name}] `);
  }

  private configureLog4js(
    logLevel: string,
    logFileLevel: string
  ): void {
    if (!logLevel) {
      logLevel = this.logLevel;
    } else {
      logLevel = this.logLevel;
    }

    if (!logFileLevel) {
      logFileLevel = this.logFileLevel;
    } else {
      logFileLevel = this.logFileLevel;
    }

    log4js.configure({
      levels: {
        TRACE: { value: log4js.levels.TRACE.level, colour: "white" },
      },
      appenders: {
        // Stdout purpose appender.
        stdout: {
          type: "stdout",
          layout: DEFAULT_LAYOUT,
        },
        stdoutFilter: {
          type: "logLevelFilter",
          appender: "stdout",
          level: logLevel,
        },

        // General purpose log.
        file: {
          type: "dateFile",
          filename: "logs/application.log",
          layout: DEFAULT_LAYOUT,
        },
        logFile: {
          type: "logLevelFilter",
          appender: "file",
          level: logFileLevel,
        },
      },
      categories: {
        default: {
          appenders: ["stdoutFilter", "logFile"],
          level: "trace",
        },
      },
    });
  }

  public changeAppName(name: string) {
    this.logger = log4js.getLogger(name);
    this.logger.addContext("appId", `[${name}] `);
  }

  public changeLogLevels(logLevel: string, logFileLevel: string) {
    this.configureLog4js(logLevel, logFileLevel)
  }

  public trace(message: string): void {
    this.logger.trace(message);
  }

  public debug(message: string): void {
    this.logger.debug(`${message}`);
  }

  public info(message: string): void {
    this.logger.info(`${message}`);
  }

  public warn(message: string): void {
    this.logger.warn(`${message}`);
  }

  public error(message: string): void {
    this.logger.error(`${message}`);
  }

  public fatal(message: string): void {
    this.logger.fatal(`${message}`);
  }
}

export let logger: Logger;

export function startDefaultLogger() {
  startLogger();
}

export function startLogger(name: string = DEFAULT_LOGGER_NAME, logLevel: string = '', logFileLevel: string = '') {
  logger = new Logger(name, logLevel, logFileLevel);
  logger.changeAppName(name);
  logger.changeLogLevels(logLevel, logFileLevel);
}
