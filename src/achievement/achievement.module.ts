import { Module } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementController } from "./achievement.controller";
import { PrismaService } from "src/prisma.service";
import { ProfileService } from "src/profile/profile.service";

@Module({
  controllers: [AchievementController],
  providers: [AchievementService, PrismaService, ProfileService],
})
export class AchievementModule {}
