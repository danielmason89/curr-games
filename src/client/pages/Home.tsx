import React from 'react';
import {
  useGetPopularGamesQuery,
  useGetUpcomingGamesQuery,
  useGetNewGamesQuery,
} from '@/client/hooks/useGamesApi';
import { SearchBar } from '@/client/components/SearchBar';
import { GamesList } from '../components/GamesList';

export default function Home() {
  const popular = useGetPopularGamesQuery();
  const upcoming = useGetUpcomingGamesQuery();
  const newGames = useGetNewGamesQuery();

  return (
    <div>
      <SearchBar />
      <GamesList title='Popular Games' {...popular} />
      <GamesList title='Upcoming Games' {...upcoming} />
      <GamesList title='New Games' {...newGames} />
    </div>
  );
}
