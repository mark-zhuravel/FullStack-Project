import { Quest } from './quest.interface';
import { OrderStatus } from '../../orders/enums/order-status.enum';

export interface QuestResponse extends Quest {
  orders?: {
    id: number;
    userId: string;
    questId: string;
    numberOfPlayers: number;
    dateTime: Date;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
  }[];
} 