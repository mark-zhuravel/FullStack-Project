import { Injectable, NotFoundException } from '@nestjs/common';
import { PostgreSQLService } from 'src/core/database/postgresql/postgresql.service';
import { Quest } from './interfaces/quest.interface';
import { QuestResponse } from './interfaces/quest-response.interface';
import { OrderStatus } from '../orders/enums/order-status.enum';

interface CreateQuestData {
  title: string;
  description: string;
  difficulty: string;
  duration: number;
  price: number;
  maxPlayers: number;
  minPlayers: number;
  category: string;
  imageUrl: string;
  isActive?: boolean;
}

interface UpdateQuestData extends Partial<CreateQuestData> {}

@Injectable()
export class QuestsService {
  constructor(private prisma: PostgreSQLService) {}

  async create(data: CreateQuestData): Promise<Quest> {
    return this.prisma.quest.create({
      data,
    });
  }

  async findAll(): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async findAllAdmin(): Promise<QuestResponse[]> {
    const quests = await this.prisma.quest.findMany({
      include: {
        orders: true,
      },
    });
    return quests.map(quest => ({
      ...quest,
      orders: quest.orders.map(order => ({
        ...order,
        id: order.id.toString(),
        status: order.status as OrderStatus,
        price: quest.price * order.numberOfPlayers
      }))
    }));
  }

  async findOne(id: string): Promise<QuestResponse> {
    try {
      console.log('Finding quest with id:', id);
      
      const quest = await this.prisma.quest.findUnique({
        where: { id },
        include: {
          orders: true,
        },
      });

      console.log('Found quest:', quest);

      if (!quest) {
        console.log('Quest not found');
        throw new NotFoundException('Квест не найден');
      }

      const response = {
        ...quest,
        orders: quest.orders.map(order => ({
          ...order,
          id: order.id.toString(),
          status: order.status as OrderStatus,
          price: quest.price * order.numberOfPlayers,
          phone: order.phone || 'not_provided'
        }))
      };

      console.log('Returning response:', response);
      return response;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw new NotFoundException('Квест не найден или произошла ошибка при его получении');
    }
  }

  async update(id: string, data: UpdateQuestData): Promise<Quest> {
    try {
      return await this.prisma.quest.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException('Квест не найден');
    }
  }

  async remove(id: string): Promise<Quest> {
    try {
      return await this.prisma.quest.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Квест не найден');
    }
  }

  async toggleActive(id: string): Promise<Quest> {
    const quest = await this.findOne(id);
    return this.prisma.quest.update({
      where: { id },
      data: { isActive: !quest.isActive },
    });
  }
} 