import { IsEmail, IsString } from 'class-validator';

export class SendAnalyticsDto {
  @IsString()
  @IsEmail()
  email: string;
}
