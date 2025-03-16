import React from 'react';
import styled from 'styled-components';
import type { GamesResponse } from '@/shared/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Game from './Game';
import { motion } from 'framer-motion';
import { GameListSkeleton } from './GameListSkeleton';
import ErrorMessage from './ErrorMessage';

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
    return (
      <ErrorMessage
        title={`Error Loading ${title || 'Games'}`}
        message='We encountered a problem while loading the games.'
        icon='error'
      />
    );
  }

  if (isLoading) {
    return <GameListSkeleton title={title} />;
  }

  if (!data?.results.length) {
    return (
      <ErrorMessage
        title='No Results Found'
        message={`We couldn't find any ${title ? title.toLowerCase() : 'games'} to display.`}
        icon='search'
      />
    );
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

export const GameList = styled(motion.div)`
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

export const Games = styled(motion.ul)`
  display: grid;
  justify-content: flex-start;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;

  @media (max-width: 768px) {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    text-align: center;
  }
`;
