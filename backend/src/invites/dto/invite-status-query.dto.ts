import { IsEmail } from 'class-validator';

export class InviteStatusQueryDto {
  @IsEmail()
  email: string;
}
