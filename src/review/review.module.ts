import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { PrismaService } from "src/prisma.service";
import { ProfileService } from "src/profile/profile.service";

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, ProfileService],
})
export class ReviewModule {}
