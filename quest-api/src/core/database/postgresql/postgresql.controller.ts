import { Controller, Get, UseGuards } from '@nestjs/common';
import { PostgreSQLService } from './postgresql.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRole } from '../../../users/enums/user-role.enum';

@Controller('postgresql')
export class PostgreSQLController {
  constructor(private readonly postgresqlService: PostgreSQLService) {}

  @Get('health')
  async checkHealth() {
    const isHealthy = await this.postgresqlService.checkHealth();
    return { status: isHealthy ? 'ok' : 'error' };
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getStats() {
    // Здесь можно добавить статистику по базе данных
    return { message: 'PostgreSQL stats' };
  }
} 