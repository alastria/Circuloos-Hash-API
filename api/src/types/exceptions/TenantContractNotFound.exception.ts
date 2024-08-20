import AppError from "./AppError.exception";

export default class TenantContractNotFoundException extends AppError {
  constructor(tenantName: string) {
    super(
      'TenantContractNotFoundException', 
      `Tenant ${tenantName} does not have a registered contract.`, 
      {}, 
      400
    );
  }
}