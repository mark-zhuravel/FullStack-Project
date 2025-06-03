import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { QuestsModule } from './quests/quests.module';
import { MongodbModule } from './core/database/mongodb/mongodb.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongodbModule,
    UsersModule,
    OrdersModule,
    QuestsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 