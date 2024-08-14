import AppError from "./AppError.exception";

export default class ContractNotFoundException extends AppError {
  constructor(contractName: string, contractList: string[]) {
    super(
      'ContractNotFoundException', 
      `Contract '${contractName}' could not be found`, 
      { contracts: contractList }, 
      400
    );
  }
}