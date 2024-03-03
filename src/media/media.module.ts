import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MediaController } from "./media.controller";
import { PrismaService } from "src/prisma.service";
import { ProfileService } from "src/profile/profile.service";

@Module({
  controllers: [MediaController],
  providers: [MediaService, PrismaService, ProfileService],
})
export class MediaModule {}
