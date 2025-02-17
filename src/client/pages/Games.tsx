import React from 'react';
import { useGetGamesQuery } from '@/client/hooks/useGamesApi';
import { GameList } from '@/client/components/GameList';

export default function Games() {
  // RTK Query hook automatically handles:
  // - Data fetching
  // - Loading states
  // - Error states
  // - Caching
  // No need for useEffect or manual loading/error state management
  const { data: games, isLoading, error } = useGetGamesQuery();

  if (error) {
    return (
      <div className='error'>
        An error occurred while fetching games.
        <p>{error.toString()}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading Games...</div>;
  }

  if (!games) {
    return <div>No games found</div>;
  }

  return (
    <div className='games'>
      <h2>Total Games: {games?.length || 0}</h2>
      <GameList games={games} />
      <div>
        <h3>Full response object</h3>
        <pre>{JSON.stringify(games, null, 2)}</pre>
      </div>
    </div>
  );
}
