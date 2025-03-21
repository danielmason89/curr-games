import React from 'react';

// RTK Query hooks
import {
  useGetPopularGamesQuery,
  useGetUpcomingGamesQuery,
  useGetNewGamesQuery,
} from '@/client/hooks/useGamesApi';

// Components
import { GamesList } from '../components/GamesList';

// Animations & styling
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn } from '@/client/utils/animations';

export default function Home() {
  const popular = useGetPopularGamesQuery();
  const upcoming = useGetUpcomingGamesQuery();
  const newGames = useGetNewGamesQuery();

  return (
    <GameList
      variants={fadeIn}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <GamesList title='Popular Games' {...popular} />
      <GamesList title='Upcoming Games' {...upcoming} />
      <GamesList title='New Games' {...newGames} />
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
