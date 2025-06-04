import { Quest } from './quest.interface';
import { OrderStatus } from '../../orders/dto/update-order.dto';

export interface QuestResponse extends Quest {
  orders?: {
    id: string;
    userId: string;
    questId: string;
    numberOfPlayers: number;
    dateTime: Date;
    status: OrderStatus;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
} 