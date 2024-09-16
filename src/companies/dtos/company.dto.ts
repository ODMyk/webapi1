import { ContractDto } from 'src/contracts/dtos/contract.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export class CompanyDto {
  id: number;
  name: string;
  owner: UserDto;
  createdAt: Date;
  updatedAt: Date;
  contracts: ContractDto[];
}
