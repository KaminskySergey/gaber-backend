import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Body,
  Param,
  Put,
  Get,
  Delete,
} from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AchievementDto } from "./dto/achievement-dto";
import { ProfileService } from "src/profile/profile.service";

@Controller("achievements")
export class AchievementController {
  constructor(
    private readonly achievementService: AchievementService,
    private readonly profileService: ProfileService,
  ) {}

  @Get("")
  @HttpCode(200)
  async getAll() {
    return await this.achievementService.getAllAchievement();
  }

  @Post("")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async create(@Body() dto: AchievementDto) {
    const { id: profileId } = await this.profileService.searchProfile();
    return await this.achievementService.createAchievement(dto, profileId);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() dto: AchievementDto) {
    return await this.achievementService.updateAchievement(id, dto);
  }

  @Delete(":id")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async delete(@Param("id") id: string) {
    return await this.achievementService.deleteAchievement(id);
  }
}
