import { Exclude, Expose, Type } from 'class-transformer';
import { IOrder } from '../../orders/interfaces/order.interface';

@Exclude()
export class OrderResponseDto {
  @Expose()
  id: number;

  @Expose()
  numberOfPlayers: number;

  @Expose()
  @Type(() => Date)
  dateTime: Date;

  @Expose()
  status: string;

  @Expose()
  phone: string;

  constructor(partial: Partial<OrderResponseDto>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class QuestResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  difficulty: string;

  @Expose()
  duration: number;

  @Expose()
  price: number;

  @Expose()
  maxPlayers: number;

  @Expose()
  minPlayers: number;

  @Expose()
  category: string;

  @Expose()
  imageUrl: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  orders?: IOrder[];

  constructor(partial: Partial<QuestResponseDto>) {
    Object.assign(this, partial);
  }
} 