import { IsString, IsEmail, IsOptional } from "class-validator";

export class ProfileDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  birthDate: string;

  @IsString()
  @IsOptional()
  avatarPath: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;
}
