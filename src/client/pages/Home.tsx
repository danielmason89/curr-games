import React from 'react';

// RTK Query hooks
import {
  useGetPopularGamesQuery,
  useGetUpcomingGamesQuery,
  useGetNewGamesQuery,
} from '@/client/hooks/useGamesApi';

// Components
import { GameListContainer, GamesList } from '../components/GamesList';

export default function Home() {
  const popular = useGetPopularGamesQuery();
  const upcoming = useGetUpcomingGamesQuery();
  const newGames = useGetNewGamesQuery();

  return (
    <GameListContainer>
      <GamesList title='Popular Games' {...popular} />
      <GamesList title='Upcoming Games' {...upcoming} />
      <GamesList title='New Games' {...newGames} />
    </GameListContainer>
  );
}
