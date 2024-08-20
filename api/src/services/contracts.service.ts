import {
  BaseContract,
  ContractMethod,
  ContractMethodArgs,
  ContractTransactionReceipt,
  ContractTransactionResponse,
  Fragment,
  FunctionFragment,
  Interface,
  Overrides,
  ParamType,
  Signer,
  Typed,
  ethers,
  getAddress
} from 'ethers';

import ContractInstanceNotFoundException from '../types/exceptions/ContractInstanceNotFound.exception';
import ContractMethodNotFoundException from '../types/exceptions/ContractMethodNotFound.exception';
import ContractNotFoundException from '../types/exceptions/ContractNotFound.exception';
import ContractCollection from '../types/ContractCollection.type';
import Logger from '../helpers/logger.helper';
import Contract from '../types/Contract.type';
import Config from '../types/Config.type';

let config: Config;
let logger: Logger;
let contracts: ContractCollection;
let signer: Signer;

export function getContract(contractName: string): Contract {
  const contract: Contract | undefined = contracts[contractName];

  if (!contract) {
    throw new ContractNotFoundException(contractName, Object.keys(contracts));
  }

  return contract;
}

export async function getContractInstance(contractName: string, contractAddress: string): Promise<BaseContract> {
  const contract: Contract = getContract(contractName);
  const address: string = getAddress(contractAddress);

  const contractInstance: BaseContract = new ethers.Contract(address, contract.abi, signer);
  const bytecode: string | null = await contractInstance.getDeployedCode();

  if (bytecode === null) throw new ContractInstanceNotFoundException(contractName, contractAddress);

  return contractInstance;
}

export async function getContractMethod(
  contractName: string,
  contractAddress: string,
  methodName: string,
  args: ContractMethodArgs<any[]>
): Promise<ContractMethod> {
  const contractInstance: BaseContract = await getContractInstance(contractName, contractAddress);

  try {
    const matchingFuncs = contractInstance.getFunction(methodName);
    const emptyOptions: Typed = Typed.from('overrides', {});
    const matchingFragment: FunctionFragment = matchingFuncs.getFragment(...args, emptyOptions);
    const fragmentName = matchingFragment.name;
    const fragmentParams = getTypesRecursive(matchingFragment.inputs);
    return contractInstance.getFunction(`${fragmentName}(${fragmentParams})`);
  } catch (exception: any) {
    logger.error(exception);
    throw new ContractMethodNotFoundException(
      contractName,
      contractAddress,
      methodName,
      getContractMethods(contractInstance.interface)
    );
  }
}

function getTypesRecursive(inputs: readonly ParamType[]): string {
  // tuple(uint256,string,tuple(uint256,string))
  return inputs.map((input) => {
    let type = input.type;

    if (input.components !== null && input.components.length > 0) {
      type += `(${getTypesRecursive(input.components)})`;
    }
    
    return type;
  }).join(',');
}

export function getContractMethods(contractInterface: Interface): string[] {
  return contractInterface.fragments
    .filter((f: Fragment) => f instanceof FunctionFragment)
    .map((f: Fragment) => f as FunctionFragment)
    .map((f: FunctionFragment) => {
      const name = f.name;
      const mutability = f.stateMutability;
      const outputString = f.outputs.map((output) => `${output.type}`).join(', ');
      const inputString = f.inputs.map((input) => `${input.type} ${input.name}`).join(', ');

      let finalOutput;
      if (f.outputs.length < 1) {
        finalOutput = `void`;
      } else if (f.outputs.length > 1) {
        finalOutput = `(${outputString})`;
      } else {
        finalOutput = outputString;
      }

      return `${mutability} ${finalOutput} ${name}(${inputString})`;
    });
}

export async function callContractMethod(
  contractName: string,
  contractAddress: string,
  methodName: string,
  args: any[],
  options: Overrides
): Promise<any> {``
  const func: ContractMethod = await getContractMethod(contractName, contractAddress, methodName, args);
  let result: any = await func(...args, options);
  if (result.toObject instanceof Function) {
    result = result.toObject();
  }

  return result;
}

export async function executeContractMethod(
  contractName: string,
  contractAddress: string,
  methodName: string,
  args: any[],
  options: Overrides
): Promise<ContractTransactionResponse | ContractTransactionReceipt | null> {
  const func: ContractMethod = await getContractMethod(contractName, contractAddress, methodName, args);
  let executeTransaction: ContractTransactionResponse = await func(...args, options);
  logger.debug(`Tx response: ${JSON.stringify(executeTransaction)}`);

  if (executeTransaction.wait) {
    logger.info('Waiting for confirmations');
    const receipt: ContractTransactionReceipt | null = await executeTransaction.wait();
    logger.debug(`Tx receipt: ${JSON.stringify(receipt)}`);

    return receipt;
  } else {
    return executeTransaction;
  }
}

export async function initContractsService(_logger: Logger, _contracts: ContractCollection, _config: Config) {
  logger = _logger;
  contracts = _contracts;
  config = _config;
  signer = new ethers.Wallet(config.NETWORK.WALLET_PRIV_KEY).connect(new ethers.JsonRpcProvider(config.NETWORK.URL));
}
