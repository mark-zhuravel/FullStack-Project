import { Quest } from '../types/quest.types';
import { API_BASE_URL } from '../config/api';

export const questService = {
  async getAllQuests(): Promise<Quest[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/quests`, {
      headers: token ? {
        'Authorization': `Bearer ${token}`
      } : undefined
    });
    if (!response.ok) {
      throw new Error('Failed to fetch quests');
    }
    return response.json();
  },

  async getQuestById(id: string): Promise<Quest> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/quests/${id}`, {
      headers: token ? {
        'Authorization': `Bearer ${token}`
      } : undefined
    });
    if (!response.ok) {
      throw new Error('Failed to fetch quest');
    }
    return response.json();
  }
}; 