import React from 'react';
import { Link } from 'react-router';
import type { GamesResponse } from '@/shared/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface GamesListProps {
  title: string;
  data?: GamesResponse;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

export const GamesList = ({
  title,
  data,
  isLoading,
  error,
}: GamesListProps) => {
  if (error) {
    return <div>Error loading {title}</div>;
  }

  if (isLoading) {
    return <div>Loading {title}...</div>;
  }

  if (!data?.results.length) {
    return <div>No {title} found</div>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {data?.results.map(game => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
