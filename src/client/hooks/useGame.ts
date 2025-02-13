import { useState, useEffect } from 'react';
import { gamesApi } from '../lib/api';
import type { GameDetails } from '@/shared';
import type { GameId } from '@/shared/schemas';

interface UseGameReturn {
  game: GameDetails | null;
  isLoading: boolean;
  error: string | null;
}

export function useGame(id: GameId): UseGameReturn {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await gamesApi.getGameById(id);
        setGame(data);
      } catch (err) {
        setError('Failed to load game details');
        console.error('Error fetching game:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  return { game, isLoading, error };
}
