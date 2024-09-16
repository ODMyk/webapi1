import { CompanyDto } from 'src/companies/dtos/company.dto';
import { ContractDto } from 'src/contracts/dtos/contract.dto';

export class UserDto {
  id: number;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  companies: CompanyDto[];
  contracts: ContractDto[];
}
