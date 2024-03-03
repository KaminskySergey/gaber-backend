import { Auth } from "src/auth/decorators/auth.decorator";
import { MediaService } from "./media.service";
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
import { MediaDto } from "./dto/media-dto";
import { ProfileService } from "src/profile/profile.service";

@Controller("medias")
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly profileService: ProfileService,
  ) {}

  @HttpCode(200)
  @Get("")
  async getAll() {
    return await this.mediaService.getAllMedia();
  }

  @Post("")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async create(@Body() dto: MediaDto) {
    const { id: profileId } = await this.profileService.searchProfile();
    return await this.mediaService.createMedia(dto, profileId);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() dto: MediaDto) {
    return await this.mediaService.updateMedia(id, dto);
  }

  @Delete(":id")
  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  async delete(@Param("id") id: string) {
    return await this.mediaService.deleteMedia(id);
  }
}
