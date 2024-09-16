import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ChangeCompanyOwnerDto {
  @IsInt()
  @Type(() => Number)
  ownerId: number;
}
