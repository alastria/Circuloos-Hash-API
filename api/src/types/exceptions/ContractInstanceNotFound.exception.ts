import AppError from "./AppError.exception";

export default class ContractInstanceNotFoundException extends AppError {
  constructor(contractName: string, contractAlias: string) {
    super(
      'ContractInstanceNotFoundException', 
      `Contract '${contractName}' with instance at '${contractAlias}' does not seem to be deployed on the network. Please check that you are using a correct address.`, 
      {}, 
      400
    );
  }
}