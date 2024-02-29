import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AchievementDto } from "./dto/achievement-dto";

@Injectable()
export class AchievementService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAchievement() {
    return await this.prisma.achievement.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        date: true,
        photo: true,
        description: true,
      },
    });
  }

  async createAchievement() {
    return await this.prisma.achievement.create({
      data: {
        name: "",
        date: "",
        photo: "",
        description: "",
      },
    });
  }

  async updateAchievement(id: string, dto: AchievementDto) {
    await this.getByIdAchievement(id);

    const { date, name, photo, description } = dto;
    return await this.prisma.achievement.update({
      where: { id },
      data: {
        name,
        date,
        photo,
        description,
      },
    });
  }

  async deleteAchievement(id: string) {
    await this.getByIdAchievement(id);

    await this.prisma.achievement.delete({
      where: { id },
    });

    return { data: `Success review ${id} delete` };
  }

  private async getByIdAchievement(id: string) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new NotFoundException("Achievement not found");
    }

    return achievement;
  }
}
