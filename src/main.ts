import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOption={
    origin:['http://localhost:4200']
  }
  app.enableCors(corsOption);

  await app.listen(3000);
}
bootstrap();
