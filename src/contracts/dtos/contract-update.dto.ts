import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UpdateContractDto {
  @IsInt()
  @Type(() => Number)
  companyId: number;

  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsInt()
  @Type(() => Number)
  salary: number;
}
