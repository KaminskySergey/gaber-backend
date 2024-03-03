import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MediaDto } from "./dto/media-dto";

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}
  private async getByIdMedia(id: string) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException("Review not found");
    }

    return media;
  }

  async getAllMedia() {
    return await this.prisma.media.findMany({
      select: {
        id: true,
        name: true,
        link: true,
        icon: true,
      },
    });
  }

  async createMedia(dto, profileId) {
    return await this.prisma.media.create({
      data: {
        name: dto.name || "",
        icon: dto.icon || "",
        link: dto.link || "",
        profileId,
      },
    });
  }

  async updateMedia(id: string, dto: MediaDto) {
    const { name, link, icon } = dto;
    await this.getByIdMedia(id);

    return await this.prisma.media.update({
      where: { id },
      data: {
        name,
        link,
        icon,
      },
    });
  }

  async deleteMedia(id: string) {
    await this.getByIdMedia(id);

    await this.prisma.media.delete({
      where: { id },
    });
    return { data: `Success media ${id} delete` };
  }
}
