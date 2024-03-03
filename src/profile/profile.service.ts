import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ProfileDto } from "./dto/profile-dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(selectObject: Prisma.ProfileSelect = {}) {
    const profile = await this.prisma.profile.findFirst({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        avatarPath: true,
        phone: true,
        description: true,
        email: true,
        reviews: true,
        userId: true,
        achievements: true,
        medias: true,
        ...selectObject,
      },
    });
    return profile;
  }

  async create() {
    return await this.prisma.profile.create({
      data: {
        firstName: "",
        lastName: "",
        birthDate: "",
        avatarPath: "",
        description: "",
        email: "",
      },
    });
  }

  async update(id: string, dto: ProfileDto) {
    return await this.prisma.profile.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        birthDate: dto.birthDate,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        description: dto.description,
        email: dto.email,
      },
    });
  }

  async getProfileIdByUserId(userId: string) {
    return this.prisma.profile.findUnique({
      where: { userId },
    });
  }

  async searchProfile() {
    const profile = await this.prisma.profile.findMany({
      take: 1,
    });
    return profile.length > 0 ? profile[0] : null;
  }
}
