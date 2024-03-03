import { IsOptional, IsString } from "class-validator";

export class MediaDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  profileId: string | null;
}
