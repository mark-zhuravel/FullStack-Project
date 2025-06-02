import { Controller, Get, UseGuards } from '@nestjs/common';
import { MongodbService } from 'src/core/database/mongodb/mongodb.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller('mongodb')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService) {}

  @Get('health')
  async checkHealth() {
    try {
      // Проверяем подключение к базе данных, выполнив простой запрос
      await this.mongodbService.user.findFirst();
      return {
        status: 'ok',
        message: 'MongoDB connection is healthy',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'MongoDB connection failed',
        error: error.message,
      };
    }
  }

  @Get('stats')
  async getDatabaseStats() {
    try {
      // Получаем базовую статистику
      const usersCount = await this.mongodbService.user.count();
      
      return {
        status: 'ok',
        stats: {
          users: usersCount,
          // Здесь можно добавить другие статистические данные
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to get database stats',
        error: error.message,
      };
    }
  }
} 