import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
  // imports: [PrismaService]
})
export class ProfileModule {}
