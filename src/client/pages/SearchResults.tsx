import React from 'react';
import { useSearchParams } from 'react-router';
import { useSearchGamesQuery } from '@/client/hooks/useGamesApi';
import { GamesList } from '@/client/components/GamesList';
import { fadeIn } from '../utils/animations';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const title = `Search results for "${query}"`;

  const games = useSearchGamesQuery(query);

  return (
    <GameList
      variants={fadeIn}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <GamesList title={title} {...games} />
    </GameList>
  );
}

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 2rem;
  }
  @media (max-width: 768px) {
    padding: 0rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    h2 {
      font-size: 1.25rem;
      text-align: center;
      padding: 1rem 2rem;
    }
  }
`;
