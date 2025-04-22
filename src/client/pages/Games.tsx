import React from 'react';
import { useSearchParams } from 'react-router';
import { useGetGamesQuery } from '@/client/hooks/useGamesApi';
import { GameListContainer, GamesList } from '@/client/components/GamesList';
import { fadeIn } from '../utils/animations.js';

export default function Games() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const title = query ? `Search Results for "${query}"` : 'All Games';

  const games = useGetGamesQuery({ search: query });

  return (
    <GameListContainer
      variants={fadeIn}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <GamesList title={title} {...games} />
    </GameListContainer>
  );
}
