import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetContractDto {
  @IsInt()
  @Type(() => Number)
  companyId: number;

  @IsInt()
  @Type(() => Number)
  userId: number;
}
