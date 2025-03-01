import React from 'react';
import { useSearchParams } from 'react-router';
import { useSearchGamesQuery } from '@/client/hooks/useGamesApi';
import {GamesList} from '@/client/components/GamesList';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading, error } = useSearchGamesQuery(query);

  if (error) {
    return (
      <div className='error'>
        An error occurred while searching games.
        <p>{error.toString()}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Searching...</div>;
  }

  if (!data?.results.length) {
    return <div>No games found for &quot;{query}&quot;</div>;
  }

  return (
    <div>
      <GamesList data={data} isLoading={isLoading} />
    </div>
  );
}
