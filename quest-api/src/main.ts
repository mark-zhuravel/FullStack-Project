import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { environment } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Включаем CORS
  app.enableCors({
    origin: true, // Разрешаем все origins в development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
  });

  // Включаем глобальную валидацию
  app.useGlobalPipes(new ValidationPipe());
  
  // Настраиваем раздачу статических файлов
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // Добавляем глобальный префикс /api
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT || 3000);
}

bootstrap(); 