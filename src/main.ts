import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/pictures/logos', express.static(path.join(__dirname, '..', 'pictures/logos')));
  app.use('/pictures/logos', express.static(path.join(__dirname, '..', 'pictures/person')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
