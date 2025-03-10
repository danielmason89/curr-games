import React from 'react';
import styled from 'styled-components';
import type { GamesResponse } from '@/shared/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Game from './Game';
import { motion } from 'framer-motion';

interface GamesListProps {
  data?: GamesResponse;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  title?: string;
}

export const GamesList = ({
  data,
  isLoading,
  error,
  title,
}: GamesListProps) => {
  if (error) {
    return <div>Error loading</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.results.length) {
    return <div>No results found</div>;
  }

  return (
    <GameList>
      {title && <h2>{title}</h2>}
      <Games>
        {data?.results.map(game => (
          <Game
            key={game.id}
            id={game.id}
            name={game.name}
            released={game.released}
            image={game.background_image}
          />
        ))}
      </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 2rem;
  }
  @media (max-width: 768px) {
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

const Games = styled(motion.ul)`
  display: grid;
  justify-content: flex-start;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;

  @media (max-width: 768px) {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(200px, 4fr));
    gap: 2rem;
    text-align: center;
  }
`;
