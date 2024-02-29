import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    exposedHeaders: 'set-cookie',
  });
  app.use(cookieParser());
  await app.listen(4200);
}
bootstrap();
