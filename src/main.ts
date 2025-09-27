import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "*"
  })

  const config = new DocumentBuilder()
    .setTitle('Tocaqui SWAGGER')
    .setDescription('Documentação de rotas')
    .setVersion('1.0')
    .addTag('TOCAQUI')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.use('/pictures/logos', express.static(path.join(__dirname, '..', 'pictures/logos')));
  app.use('/pictures/logos', express.static(path.join(__dirname, '..', 'pictures/person')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
