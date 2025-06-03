import { OrderStatus } from '../dto/update-order.dto';

export interface IOrder {
  id: number;
  userId: string;
  questId: string;
  numberOfPlayers: number;
  dateTime: Date;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  quest?: any;
}

export interface IPrismaOrder {
  id: number;
  userId: string;
  questId: string;
  numberOfPlayers: number;
  dateTime: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  quest?: any;
}

export interface ICreateOrder {
  questId: string;
  numberOfPlayers: number;
  dateTime: string | Date;
  phone: string;
}

export interface IUpdateOrder {
  status?: OrderStatus;
}

export const mapPrismaOrderToInterface = (order: IPrismaOrder): IOrder => ({
  ...order,
  status: order.status as OrderStatus
}); 