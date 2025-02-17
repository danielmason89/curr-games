import React from 'react';
import { Link, useSearchParams } from 'react-router';
import { useSearchGamesQuery } from '@/client/hooks/useGamesApi';

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
      <h2>Search Results for &quot;{query}&quot;</h2>
      <ul>
        {data.results.map(game => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
