import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PostgreSQLService } from '../core/database/postgresql/postgresql.service';
import { OrderStatus } from './dto/update-order.dto';
import { ICreateOrder, IUpdateOrder, IOrder, IPrismaOrder, mapPrismaOrderToInterface } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PostgreSQLService) {}

  async create(orderData: ICreateOrder): Promise<IOrder> {
    try {
      // Проверяем существование квеста
      const quest = await this.prisma.quest.findUnique({
        where: { id: orderData.questId }
      });

      if (!quest) {
        throw new NotFoundException('Quest not found');
      }

      // Проверяем количество игроков
      if (orderData.numberOfPlayers < quest.minPlayers || orderData.numberOfPlayers > quest.maxPlayers) {
        throw new BadRequestException('Invalid number of players');
      }

      // Создаем заказ
      const order = await this.prisma.order.create({
        data: {
          questId: orderData.questId,
          userId: orderData.userId,
          numberOfPlayers: orderData.numberOfPlayers,
          dateTime: orderData.dateTime,
          status: OrderStatus.PENDING,
          price: orderData.price,
          phone: orderData.phone
        }
      });

      return mapPrismaOrderToInterface(order);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create order');
    }
  }

  async findAll(userId?: string): Promise<IOrder[]> {
    const where = userId ? { userId } : {};
    
    const orders = await this.prisma.order.findMany({
      where,
      include: {
        quest: true
      },
      orderBy: {
        dateTime: 'desc'
      }
    });

    return orders.map(order => ({
      ...mapPrismaOrderToInterface(order),
      quest: order.quest
    }));
  }

  async findOne(id: string): Promise<IOrder> {
    const order = await this.prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return mapPrismaOrderToInterface(order);
  }

  async update(id: string, updateOrderDto: IUpdateOrder): Promise<IOrder> {
    const order = await this.prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: updateOrderDto.status }
    });

    return mapPrismaOrderToInterface(updatedOrder);
  }

  async cancel(id: string): Promise<IOrder> {
    const order = await this.prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const cancelledOrder = await this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED }
    });

    return mapPrismaOrderToInterface(cancelledOrder);
  }
} 