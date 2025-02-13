import React from 'react';
import { useParams, Link, Navigate } from 'react-router';
import { useGame } from '@/client/hooks/useGame';
import { gameIdSchema } from '@/shared/schemas';

export default function GameDetails() {
  const { id } = useParams();

  const idValidation = gameIdSchema.safeParse(id);
  if (!idValidation.success) {
    return <Navigate to='/404' replace />;
  }

  const { game, isLoading, error } = useGame(idValidation.data);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className='game-details'>
      <Link to='/games'>← Back to Games</Link>
      <h2>Game Details</h2>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
}
