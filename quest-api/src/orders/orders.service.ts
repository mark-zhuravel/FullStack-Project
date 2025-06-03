import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PostgreSQLService } from '../core/database/postgresql/postgresql.service';
import { OrderStatus } from './dto/update-order.dto';
import { ICreateOrder, IUpdateOrder, IOrder, IPrismaOrder, mapPrismaOrderToInterface } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PostgreSQLService) {}

  async create(userId: string, orderData: ICreateOrder): Promise<IOrder> {
    // Проверяем существование и доступность квеста
    const quest = await this.prisma.quest.findUnique({
      where: { id: orderData.questId }
    });

    if (!quest) {
      throw new NotFoundException('Quest not found');
    }

    if (!quest.isActive) {
      throw new BadRequestException('Quest is not available for booking');
    }

    if (orderData.numberOfPlayers < quest.minPlayers || orderData.numberOfPlayers > quest.maxPlayers) {
      throw new BadRequestException(`Number of players must be between ${quest.minPlayers} and ${quest.maxPlayers}`);
    }

    // Создаем заказ
    const order = await this.prisma.order.create({
      data: {
        userId,
        quest: {
          connect: { id: orderData.questId }
        },
        numberOfPlayers: orderData.numberOfPlayers,
        dateTime: new Date(orderData.dateTime),
        status: OrderStatus.PENDING,
        phone: orderData.phone
      },
      include: {
        quest: true
      }
    });

    return mapPrismaOrderToInterface(order as IPrismaOrder);
  }

  async findAll(userId: string): Promise<IOrder[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId // Просто передаем userId как строку
      },
      include: {
        quest: true
      },
      orderBy: {
        dateTime: 'desc'
      }
    });

    return orders.map(order => mapPrismaOrderToInterface(order as IPrismaOrder));
  }

  async findOne(userId: string, id: number): Promise<IOrder> {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        userId
      },
      include: {
        quest: true
      }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return mapPrismaOrderToInterface(order as IPrismaOrder);
  }

  async update(userId: string, id: number, updateData: IUpdateOrder): Promise<IOrder> {
    // Проверяем существование заказа
    const order = await this.findOne(userId, id);

    // Проверяем возможность обновления статуса
    if (updateData.status && !this.canUpdateStatus(order.status, updateData.status)) {
      throw new BadRequestException('Invalid status transition');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        quest: true
      }
    });

    return mapPrismaOrderToInterface(updatedOrder as IPrismaOrder);
  }

  async cancel(userId: string, id: number): Promise<IOrder> {
    const order = await this.findOne(userId, id);

    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
      throw new BadRequestException('Can only cancel pending or confirmed orders');
    }

    const cancelledOrder = await this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED },
      include: {
        quest: true
      }
    });

    return mapPrismaOrderToInterface(cancelledOrder as IPrismaOrder);
  }

  private canUpdateStatus(currentStatus: string, newStatus: OrderStatus): boolean {
    // Определяем разрешенные переходы статусов
    const allowedTransitions: { [key: string]: OrderStatus[] } = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.COMPLETED]: []
    };

    return allowedTransitions[currentStatus]?.includes(newStatus) ?? false;
  }
} 