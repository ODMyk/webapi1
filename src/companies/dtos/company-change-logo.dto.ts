import { IsString, IsUrl } from 'class-validator';

export class ChangeCompanyLogoDto {
  @IsString()
  @IsUrl()
  logo: string;
}
