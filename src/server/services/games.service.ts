import { rawgApi } from '@/server/lib/axios.js';
import {
  gameDetailsSchema,
  gamesResponseSchema,
} from '@/server/lib/schemas.js';
import logger from '@/server/config/logger.js';

export const getGames = async () => {
  logger.info('Fetching games from RAWG API');
  const response = await rawgApi.get<unknown>('/games');

  const result = gamesResponseSchema.safeParse(response.data);
  if (!result.success) {
    logger.error('Invalid API response format', { error: result.error });
    throw new Error('Invalid API response format', { cause: result.error });
  }

  logger.info(
    `Successfully fetched ${result.data.results.length} games of ${result.data.count} games`
  );
  return result.data.results;
};

export const getGameById = async (id: number) => {
  logger.info(`Fetching game with ID ${id} from RAWG API`);
  const response = await rawgApi.get<unknown>(`/games/${id}`);

  const result = gameDetailsSchema.safeParse(response.data);
  if (!result.success) {
    console.error(
      'Validation errors:',
      result.error.issues.map(issue => ({
        issue: JSON.stringify(issue, null, 2),
      }))
    );
    logger.error('Invalid game details format', { error: result.error });
    throw new Error('Invalid game details format', { cause: result.error });
  }

  logger.info(`Successfully fetched game ${result.data.name}`);
  return result.data;
};
