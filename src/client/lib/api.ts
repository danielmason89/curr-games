import { api } from './axios';
import type { Game, GameDetails } from '@/shared';
import type { GameId } from '@/shared/schemas';

export const gamesApi = {
  getGames: async () => {
    const response = await api.get<Game[]>('/games');
    return response.data;
  },

  getGameById: async (id: GameId) => {
    const response = await api.get<GameDetails>(`/games/${id}`);
    return response.data;
  },
} as const;
