import { Controller, Get, UseGuards } from '@nestjs/common';
import { PostgreSQLService } from './postgresql.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Controller('postgresql')
export class PostgreSQLController {
  constructor(private readonly postgresqlService: PostgreSQLService) {}

  @Get('health')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async checkHealth() {
    const isHealthy = await this.postgresqlService.checkHealth();
    return {
      status: isHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    };
  }
} 