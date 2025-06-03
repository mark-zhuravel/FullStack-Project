import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PostgreSQLModule } from '../core/database/postgresql/postgresql.module';

@Module({
  imports: [PostgreSQLModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {} 