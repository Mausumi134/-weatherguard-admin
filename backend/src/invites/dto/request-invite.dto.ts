import { IsEmail, IsString, MinLength } from 'class-validator';

export class RequestInviteDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  city: string;
}
