import { Quest } from '../types/quest.types';

const API_URL = 'http://localhost:3000';

export const questService = {
  async getAllQuests(): Promise<Quest[]> {
    const response = await fetch(`${API_URL}/quests`);
    if (!response.ok) {
      throw new Error('Failed to fetch quests');
    }
    return response.json();
  },

  async getQuestById(id: string): Promise<Quest> {
    const response = await fetch(`${API_URL}/quests/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quest');
    }
    return response.json();
  }
}; 