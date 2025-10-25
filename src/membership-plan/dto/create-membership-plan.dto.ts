import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateMembershipPlanDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsInt()
  duration: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  academyId: number;
}
