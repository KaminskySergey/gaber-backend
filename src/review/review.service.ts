import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ReviewDto } from "./dto/review-dto";

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  private async getByIdReview(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException("Review not found");
    }

    return review;
  }

  async getAllReviews() {
    return await this.prisma.review.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        birthDate: true,
        description: true,
        rating: true,
        photo: true,
      },
    });
  }

  async createReview(dto: ReviewDto, profileId: string) {
    const { name, birthDate, description, rating, photo } = dto;
    return await this.prisma.review.create({
      data: {
        name: name || "",
        birthDate: birthDate || "",
        description: description || "",
        rating: rating || "",
        photo: photo || "",
        profileId,
      },
    });
  }

  async updateReview(id: string, dto: ReviewDto) {
    const { name, birthDate, description, rating, photo } = dto;
    await this.getByIdReview(id);

    return await this.prisma.review.update({
      where: { id },
      data: {
        name,
        birthDate,
        description,
        rating,
        photo,
      },
    });
  }

  async deleteReview(id: string) {
    await this.getByIdReview(id);

    await this.prisma.review.delete({
      where: { id },
    });

    return { data: `Success review ${id} delete` };
  }
}
