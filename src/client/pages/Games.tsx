import React from 'react';
import { Link } from 'react-router';
import { useGames } from '@/client/hooks/useGames';

export default function Games() {
  const { games, isLoading, error } = useGames();

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='games'>
      <h2>Games</h2>
      <div>
        {games.map(game => (
          <div key={game.id}>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </div>
        ))}
      </div>
      <div>
        <pre>{JSON.stringify(games, null, 2)}</pre>
      </div>
    </div>
  );
}
