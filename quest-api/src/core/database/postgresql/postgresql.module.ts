import { Module } from '@nestjs/common';
import { PostgreSQLService } from './postgresql.service';
import { PostgreSQLController } from './postgresql.controller';

@Module({
  providers: [PostgreSQLService],
  controllers: [PostgreSQLController],
  exports: [PostgreSQLService],
})
export class PostgreSQLModule {} 