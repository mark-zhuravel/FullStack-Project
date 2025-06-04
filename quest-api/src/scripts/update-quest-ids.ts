import { PrismaClient } from '../../generated/postgresql';

const prisma = new PrismaClient();

// Старые ID из локальной базы данных
const questsWithOldIds = [
  {
    title: "Склеп",
    oldId: "937e3182-7708-4218-8369-d144d3e185f7"
  },
  {
    title: "Маньяк",
    oldId: "afbd643e-37c4-4c21-b58e-3e9ffb4406e7"
  },
  {
    title: "Ритуал",
    oldId: "2afc4dd3-f0e9-438f-b70d-4f6bf8187887"
  },
  {
    title: "Марс-2056",
    oldId: "6e2e1c5b-ab4c-4f4d-93db-bcbaa8b1d49b"
  },
  {
    title: "Тайны старого особняка",
    oldId: "39ecade6-08e0-4ca9-8479-e78cd532b0be"
  },
  {
    title: "Хижина в лесу",
    oldId: "5fb619ec-309e-4bdf-9837-5352136d3ebb"
  },
  {
    title: "Фатальный эксперимент",
    oldId: "a5b2ab20-bbe3-4d27-a010-ca859d0a40ce"
  },
  {
    title: "Метро 2033",
    oldId: "017cdfa8-aee6-437f-8a98-dbe5aa1a2bfa"
  },
  {
    title: "Старый чердак",
    oldId: "7682c415-d3f9-4449-b8cc-63326adf4b4d"
  }
];

async function updateQuestIds() {
  try {
    for (const questData of questsWithOldIds) {
      // Находим квест по названию
      const quest = await prisma.quest.findFirst({
        where: { title: questData.title }
      });

      if (quest) {
        // Обновляем ID квеста
        await prisma.$executeRaw`UPDATE "Quest" SET id = ${questData.oldId}::uuid WHERE title = ${questData.title}`;
        console.log(`Обновлен ID для квеста "${questData.title}"`);
      } else {
        console.log(`Квест "${questData.title}" не найден`);
      }
    }

    console.log('Все ID квестов успешно обновлены!');
  } catch (error) {
    console.error('Ошибка при обновлении ID квестов:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateQuestIds(); 