import { PrismaClient } from '../../generated/postgresql';

const prisma = new PrismaClient();

async function clearQuests() {
  try {
    // Сначала удаляем все заказы
    await prisma.order.deleteMany({});
    console.log('Все заказы успешно удалены!');
    
    // Затем удаляем все квесты
    await prisma.quest.deleteMany({});
    console.log('Все квесты успешно удалены!');
  } catch (error) {
    console.error('Ошибка при удалении данных:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearQuests(); 