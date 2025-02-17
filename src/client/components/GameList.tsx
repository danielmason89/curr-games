import React from 'react';
import { Link } from 'react-router';
import type { Game } from '@/shared/types';

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  return games.map(game => (
    <div key={game.id}>
      <Link to={`/games/${game.id}`}>{game.name}</Link>
    </div>
  ));
};
