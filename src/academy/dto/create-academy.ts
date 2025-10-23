import { IsEmail, IsString } from 'class-validator';

export class CreateAcademyDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
}
