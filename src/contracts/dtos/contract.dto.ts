import { CompanyDto } from 'src/companies/dtos/company.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export class ContractDto {
  id: number;
  salary: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  user: UserDto;
  company: CompanyDto;
}
