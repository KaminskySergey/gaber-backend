import { IsOptional, IsString } from "class-validator";

export class AchievementDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  profileId: string | null;
}
