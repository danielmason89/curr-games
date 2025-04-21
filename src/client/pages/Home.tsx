import React from 'react';

// RTK Query hooks
import {
  useGetPopularGamesQuery,
  useGetUpcomingGamesQuery,
  useGetNewGamesQuery,
} from '@/client/hooks/useGamesApi';

// Components
import { GameListContainer, GamesList } from '../components/GamesList';

// Animations & styling
import { fadeIn } from '@/client/utils/animations';

export default function Home() {
  const popular = useGetPopularGamesQuery();
  const upcoming = useGetUpcomingGamesQuery();
  const newGames = useGetNewGamesQuery();

  return (
    <GameListContainer
      variants={fadeIn}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <GamesList title='Popular Games' {...popular} />
      <GamesList title='Upcoming Games' {...upcoming} />
      <GamesList title='New Games' {...newGames} />
    </GameListContainer>
  );
}
