import AppError from "./AppError.exception";

export default class ContractMethodNotFoundException extends AppError {
  constructor(contractName: string, contractAddress: string, methodName: string, contractMethods: string[]) {
    super(
      'ContractMethodNotFoundException', 
      `Contract '${contractName}' does not have a method '${methodName}', or it doesn't have a method '${methodName}' that accepts the provided arguments.`,
      { contract: {
        name: contractName,
        address: contractAddress,
        methods: contractMethods
      } }, 
      400
    );
  }
}