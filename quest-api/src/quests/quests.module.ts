import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { PostgreSQLModule } from 'src/core/database/postgresql/postgresql.module';

@Module({
  imports: [PostgreSQLModule],
  controllers: [QuestsController],
  providers: [QuestsService],
  exports: [QuestsService],
})
export class QuestsModule {} 