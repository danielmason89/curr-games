import React from 'react';
import { useSearchParams } from 'react-router';
import { useSearchGamesQuery } from '@/client/hooks/useGamesApi';
import { GameListContainer, GamesList } from '@/client/components/GamesList';
import { fadeIn } from '../utils/animations';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const title = `Search results for "${query}"`;

  const games = useSearchGamesQuery(query);

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
