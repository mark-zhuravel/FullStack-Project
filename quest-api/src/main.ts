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
    origin: environment.frontend.urls,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Включаем глобальную валидацию
  app.useGlobalPipes(new ValidationPipe());
  
  // Настраиваем раздачу статических файлов
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  await app.listen(process.env.PORT || 3000);
}

bootstrap(); 