import React from 'react';
import { useParams, Link, Navigate } from 'react-router';
import { useGetGameByIdQuery } from '@/client/hooks/useGamesApi';
import { GameDetailsCard } from '@/client/components/GameDetailsCard';
import { gameIdSchema } from '@/shared/schemas';

export default function GameDetails() {
  // Get the id from the URL params (e.g. /games/123)
  const { id } = useParams();

  // We need to validate the id parameter to ensure it's a valid game ID
  // before passing it to RTK Query and then to the server.
  // This gets revalidated on the server side as well.
  const idValidation = gameIdSchema.safeParse(id);
  if (!idValidation.success) {
    return <Navigate to='/404' />;
  }

  // RTK Query automatically handles:
  // - Cache invalidation
  // - Refetching when needed
  // - Deduplication of requests
  // - Loading and error states
  const {
    data: game,
    isLoading,
    error,
  } = useGetGameByIdQuery(idValidation.data);

  if (error) {
    return (
      <div className='error'>
        An error occurred while fetching game details.
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <Link to='/games'>← Back to Games</Link>
      <GameDetailsCard game={game} />
      <div>
        <h3>Full response object</h3>
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
    </div>
  );
}
