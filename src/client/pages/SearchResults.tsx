import React from 'react';
import { useSearchParams } from 'react-router';
import { useSearchGamesQuery } from '@/client/hooks/useGamesApi';
import { GamesList } from '@/client/components/GamesList';
import { GameListSkeleton } from '@/client/components/GameListSkeleton';
import ErrorMessage from '@/client/components/ErrorMessage';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const title = `Search results for "${query}"`;

  const { data, isLoading, error, originalArgs } = useSearchGamesQuery(query);

  if (error) {
    return (
      <ErrorMessage
        title='Search Error'
        message={`We encountered a problem while searching for "${query}"`}
        details={error.toString()}
        icon='error'
      />
    );
  }

  if (isLoading) {
    return <GameListSkeleton title={title} />;
  }

  if (!data?.results.length && originalArgs === query) {
    return (
      <ErrorMessage
        title='No Results Found'
        message={`We couldn't find any games matching "${query}"`}
        icon='search'>
        <p>Try using different keywords or check your spelling.</p>
      </ErrorMessage>
    );
  }

  return (
    <div>
      <GamesList data={data} isLoading={isLoading} title={title} />
    </div>
  );
}
