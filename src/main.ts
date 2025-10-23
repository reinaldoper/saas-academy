import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['*', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.use('api/stripe/webhook', express.raw({ type: 'application/json' }));

  const config = new DocumentBuilder()
    .setTitle('Saas Academy API Documentation')
    .setDescription('API para Saas Academy')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
  });
}
void bootstrap();
