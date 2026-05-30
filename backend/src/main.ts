// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Parse cookies (needed for httpOnly refreshToken cookie)
  app.use(cookieParser());

  // Enable CORS for the frontend origin
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent cross-origin
  });

  // Global DTO validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // Strip properties not in DTO
      forbidNonWhitelisted: true,
      transform: true,      // Auto-transform payloads to DTO instances
    }),
  );

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`Gentong Mas API running on port ${port}`);
}

bootstrap();
