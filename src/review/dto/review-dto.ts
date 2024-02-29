import { IsString, IsOptional } from "class-validator";

export class ReviewDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  birthDate: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  rating: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  profileId: string | null;
}
