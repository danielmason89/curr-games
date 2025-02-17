import React from 'react';
import { useGetGamesQuery } from '@/client/hooks/useGamesApi';
import { GamesList } from '@/client/components/GamesList';

export default function Games() {
  // RTK Query hook automatically handles:
  // - Data fetching
  // - Loading states
  // - Error states
  // - Caching
  // No need for useEffect or manual loading/error state management
  const games = useGetGamesQuery();

  return (
    <div className='games'>
      <GamesList title='All Games' {...games} />
      <div>
        <h3>Full response object</h3>
        <pre>{JSON.stringify(games, null, 2)}</pre>
      </div>
    </div>
  );
}
