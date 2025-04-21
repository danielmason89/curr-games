import React from 'react';
import styled from 'styled-components';
import type { GamesResponse } from '@/shared/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Game from './Game';
import { motion } from 'framer-motion';
import { GameListSkeleton } from './GameListSkeleton';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router';

interface GamesListProps {
  data?: GamesResponse;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  title?: string;
  viewMoreLink?: string;
}

export const GamesList = ({
  data,
  isLoading,
  error,
  title,
  viewMoreLink,
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

  if (!data?.results.length && !isLoading) {
    return (
      <ErrorMessage
        title='No Results Found'
        message={`We couldn't find any ${title ? title.toLowerCase() : 'games'} to display.`}
        icon='search'
      />
    );
  }

  return (
    <GameListContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {title && (
        <TitleContainer>
          <SectionTitle>{title}</SectionTitle>
          {viewMoreLink && (
            <ViewMoreLink to={viewMoreLink}>View More</ViewMoreLink>
          )}
        </TitleContainer>
      )}
      <GamesGrid>
        {data?.results.map(game => (
          <Game
            key={game.id}
            id={game.id}
            name={game.name}
            released={game.released}
            image={game.background_image}
            rating={game.rating}
          />
        ))}
      </GamesGrid>
    </GameListContainer>
  );
};

export const GameListContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  padding-inline: 2rem;

  @media (max-width: 768px) {
    padding-inline: 1rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-block: 3rem;
  width: 100%;
`;

const ViewMoreLink = styled(Link)`
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

export const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;

    &:after {
      width: 32px;
      height: 2px;
    }
  }
`;

export const GamesGrid = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.75rem;
  list-style: none;
  padding: 0;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`;
