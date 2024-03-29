import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
  Body,
  Delete,
  HttpCode,
  Get,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ReviewService } from "./review.service";
import { ReviewDto } from "./dto/review-dto";
import { ProfileService } from "src/profile/profile.service";

@Controller("reviews")
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly profileService: ProfileService,
  ) {}

  @Get("")
  @HttpCode(200)
  async getAll() {
    return await this.reviewService.getAllReviews();
  }

  @Post("")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async create(@Body() dto: ReviewDto) {
    const { id: profileId } = await this.profileService.searchProfile();
    console.log(profileId);
    return await this.reviewService.createReview(dto, profileId);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() dto: ReviewDto) {
    return await this.reviewService.updateReview(id, dto);
  }

  @Delete(":id")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async delete(@Param("id") id: string) {
    return await this.reviewService.deleteReview(id);
  }
}
