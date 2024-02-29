import {
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  Put,
  Param,
  Body,
  ValidationPipe,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ProfileDto } from "./dto/profile-dto";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("")
  @HttpCode(200)
  async getProfile() {
    const profile = await this.profileService.getProfile();
    return profile;
  }

  @Post("")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async create() {
    return await this.profileService.create();
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth("admin")
  async update(@Param("id") id: string, @Body() dto: ProfileDto) {
    return await this.profileService.update(id, dto);
  }
}
