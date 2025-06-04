import { Quest } from '../types/quest.types';
import { API_BASE_URL } from '../config/api';

export const questService = {
  async getAllQuests(): Promise<Quest[]> {
    const response = await fetch(`${API_BASE_URL}/quests`);
    if (!response.ok) {
      throw new Error('Failed to fetch quests');
    }
    return response.json();
  },

  async getQuestById(id: string): Promise<Quest> {
    const response = await fetch(`${API_BASE_URL}/quests/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quest');
    }
    return response.json();
  }
}; 