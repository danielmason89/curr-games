import React from 'react';
import type { Game } from '@/shared/types';

interface GameDetailsCardProps {
  game: Game;
}

export const GameDetailsCard = ({ game }: GameDetailsCardProps) => {
  return (
    <div>
      <h2>
        {game.name} ({game.released})
      </h2>
      <div>
        <h3>Platforms</h3>
        <ul>
          {game.platforms?.map(platform => (
            <li key={platform.platform.id}>{platform.platform.name}</li>
          ))}
        </ul>
      </div>
      <img
        src={game.background_image || ''}
        alt={game.name}
        width={800}
        height={450}
      />
    </div>
  );
};
