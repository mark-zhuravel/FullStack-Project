import { OrderStatus } from '../dto/update-order.dto';
import { Quest } from '../../quests/interfaces/quest.interface';

export interface IOrder {
  id: string;
  questId: string;
  userId: string;
  numberOfPlayers: number;
  dateTime: Date;
  status: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  quest?: Quest;
}

export interface IPrismaOrder {
  id: string;
  questId: string;
  userId: string;
  numberOfPlayers: number;
  dateTime: Date;
  status: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  quest?: Quest;
}

export interface ICreateOrder {
  questId: string;
  userId: string;
  numberOfPlayers: number;
  dateTime: Date;
  price: number;
}

export interface IUpdateOrder {
  status: string;
}

export function mapPrismaOrderToInterface(order: IPrismaOrder): IOrder {
  return {
    id: order.id,
    questId: order.questId,
    userId: order.userId,
    numberOfPlayers: order.numberOfPlayers,
    dateTime: order.dateTime,
    status: order.status,
    price: order.price,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    quest: order.quest
  };
} 