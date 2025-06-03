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
  createdAt: Date;
  updatedAt: Date;
} 