import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";
import { ReviewModule } from "./review/review.module";
import { AchievementModule } from "./achievement/achievement.module";
import { MediaModule } from "./media/media.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProfileModule,
    ReviewModule,
    AchievementModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
