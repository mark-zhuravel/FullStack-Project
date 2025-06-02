import { Prisma } from '@prisma/client';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
} 