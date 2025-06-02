import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включаем CORS
  app.enableCors({
    origin: 'http://localhost:5173', // URL нашего фронтенда чтоб корсы не ругались
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Включаем глобальную валидацию
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
}
bootstrap(); 