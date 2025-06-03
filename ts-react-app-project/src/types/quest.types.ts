export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: number;
  price: number;
  maxPlayers: number;
  minPlayers: number;
  category: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Вспомогательный тип для отображения в компонентах
export interface QuestDisplay {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  players: string;
  duration: string;
  image: string;
  description: string;
}

// Функция для преобразования категорий
const mapCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    "Приключение": "Приключение",
    "Ужасы": "Ужасы",
    "Мистика": "Мистика",
    "Детектив": "Детектив",
    "Sci-Fi": "Sci-Fi"
  };
  return categoryMap[category] || category;
};

// Функция для преобразования Quest в QuestDisplay
export const convertToQuestDisplay = (quest: Quest): QuestDisplay => ({
  id: quest.id,
  title: quest.title,
  category: mapCategory(quest.category),
  difficulty: quest.difficulty,
  players: `${quest.minPlayers}-${quest.maxPlayers} чел`,
  duration: `${quest.duration} мин`,
  image: quest.imageUrl,
  description: quest.description,
}); 