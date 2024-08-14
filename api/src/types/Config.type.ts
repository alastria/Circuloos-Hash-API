export default interface Config {
  SERVICE_NAME: string;
  PORT: number;
  CONTRACTS_FILE: string;
  CONTRACT: { NAME: string, ADDRESS: string }
  NETWORK: { URL: string; WALLET_PRIV_KEY: string };
  LOG_LEVELS: { LOG_LEVEL_SYSTEM: string; LOG_LEVEL_FILE: string };
}