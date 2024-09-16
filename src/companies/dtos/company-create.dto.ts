import { Type } from 'class-transformer';
import { IsInt, IsString, IsUrl, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsInt()
  @Type(() => Number)
  ownerId: number;

  @IsString()
  @IsUrl()
  logo: string;
}
