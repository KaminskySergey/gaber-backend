import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2],
    exposedHeaders: "set-cookie",
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle("Gaber backend")
    .setDescription("The Gaber API description")
    .setVersion("1.0")
    .addTag("gaber")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(4200);
}
bootstrap();
