import { useState, useEffect } from 'react';
import { gamesApi } from '../lib/api';
import type { Game } from '@/shared';

interface UseGamesReturn {
  games: Game[];
  isLoading: boolean;
  error: string | null;
}

export function useGames(): UseGamesReturn {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gamesApi.getGames();
        setGames(data);
      } catch (err) {
        setError('Failed to load games');
        console.error('Error fetching games:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, isLoading, error };
}
