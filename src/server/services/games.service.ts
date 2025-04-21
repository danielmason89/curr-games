/**
 * Games Service
 *
 * This service handles communication with the RAWG Video Games Database API.
 * It provides type-safe access to game data with runtime validation using Zod schemas.
 *
 * API Documentation: https://api.rawg.io/docs/
 *
 * Key Features:
 * - Type-safe API responses using Zod schemas
 * - Comprehensive error handling and logging
 * - Support for all RAWG API query parameters
 *
 * Common Response Fields:
 * - count: Total number of results
 * - next/previous: Pagination URLs
 * - results: Array of game objects
 *
 * Note: Some fields may be null or undefined in the API response.
 * The schema validation handles these cases appropriately.
 */

import { rawgApi } from '@/server/lib/axios.js';
import {
  gameDetailsSchema,
  gamesResponseSchema,
} from '@/server/lib/schemas.js';
import logger from '@/server/config/logger.js';
import type { GameQueryParams } from '@/shared/utils.js';
import { filterNsfwGames } from '../utils/nsfwFilter.js';

/**
 * Fetches a list of games from the RAWG API.
 *
 * @param params - Query parameters for filtering and pagination
 *   - search: Search by game name
 *   - page: Page number for pagination
 *   - page_size: Number of results per page
 *   - ordering: Sort order (e.g., '-rating', 'name', '-released')
 *   - dates: Date range for filtering (e.g., '2023-01-01,2023-12-31')
 *   See gameQuerySchema for all available parameters
 *
 * @returns A validated GamesResponse object containing:
 *   - count: Total number of results
 *   - next/previous: Pagination URLs
 *   - results: Array of game objects
 *   - user_platforms: Boolean flag (present in search results)
 *
 * @throws Error if:
 *   - API response is not an object
 *   - Response fails schema validation
 *   - Network error occurs
 */
export const getGames = async (params?: GameQueryParams) => {
  try {
    logger.info('Fetching games from RAWG API', { params });
    const pageSize = params?.page_size ? Number(params.page_size) : 20;

    const adjustedParams = {
      ...params,
      page_size: pageSize * 1.5, // Fetch extra games to account for NSFW filtering
    };

    const queryString = adjustedParams
      ? `?${new URLSearchParams(adjustedParams as unknown as Record<string, string>)}`
      : '';

    const response = await rawgApi.get<unknown>(`/games${queryString}`);

    if (!response.data || typeof response.data !== 'object') {
      logger.error('Invalid API response: not an object', {
        type: typeof response.data,
      });
      throw new Error(
        'Invalid API response format: Response data is not an object'
      );
    }

    const result = gamesResponseSchema.safeParse(response.data);

    if (!result.success) {
      // Log validation errors in a structured way
      logger.error('Games list validation failed', {
        errors: result.error.errors.map(error => ({
          path: error.path.join('.'),
          code: error.code,
          message: error.message,
        })),
        params, // Include the original params for context
      });

      throw new Error('Invalid API response format');
    }

    // Filter NSFW games
    const filteredGames = filterNsfwGames(result.data);

    // Adjust the results to match the requested page size
    if (filteredGames.results.length > pageSize) {
      filteredGames.results = filteredGames.results.slice(0, pageSize);
    }

    logger.info(
      `Successfully fetched ${filteredGames.results.length} non-NSFW games of ${result.data.count} total games`
    );
    return filteredGames;
  } catch (error) {
    // Log unexpected errors
    if (error instanceof Error) {
      logger.error('Error fetching games', {
        message: error.message,
        cause: error.cause,
        params,
      });
    }
    throw error;
  }
};

/**
 * Fetches detailed information about a specific game.
 *
 * @param id - The game's ID from the RAWG API
 *
 * @returns A validated GameDetails object containing:
 *   - Basic game information (name, slug, release date, etc.)
 *   - Detailed fields (description, website, metacritic, etc.)
 *   - Platform-specific information
 *   - Social media counts and URLs
 *   - Achievement and rating information
 *
 * Note: The game details endpoint returns a superset of the fields
 * returned by the games list endpoint. All fields are validated
 * against the gameDetailsSchema.
 *
 * @throws Error if:
 *   - API response is not an object
 *   - Response fails schema validation
 *   - Network error occurs
 */
export const getGameById = async (id: number) => {
  try {
    logger.info(`Fetching game with ID ${id} from RAWG API`);
    const response = await rawgApi.get<unknown>(`/games/${id}`);

    if (!response.data || typeof response.data !== 'object') {
      logger.error('Invalid API response: not an object', {
        type: typeof response.data,
        gameId: id,
      });
      throw new Error(
        'Invalid API response format: Response data is not an object'
      );
    }

    const result = gameDetailsSchema.safeParse(response.data);

    if (!result.success) {
      // Log validation errors with relevant context
      const errors = result.error.errors.map(error => ({
        path: error.path.join('.'),
        code: error.code,
        message: error.message,
        value: getNestedValue(
          response.data as Record<string, unknown>,
          error.path
        ),
      }));

      logger.error('Game details validation failed', {
        gameId: id,
        errors,
      });

      // Throw error with specific validation failures
      throw new Error(
        `Invalid game details format: ${errors
          .map(e => `${e.path}: ${e.message} (got: ${e.value})`)
          .join(', ')}`
      );
    }

    logger.info(`Successfully fetched game ${result.data.name}`);
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      const errorInfo: Record<string, unknown> = {
        message: error.message,
        gameId: id,
      };

      if (error.cause) {
        errorInfo.cause = error.cause;
      }

      logger.error('Error fetching game details', errorInfo);
    }
    throw error;
  }
};

// Helper function to safely get nested object values
function getNestedValue(
  obj: Record<string, unknown>,
  path: (string | number)[]
): unknown {
  return path.reduce((current: Record<string, unknown> | unknown, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key.toString()];
    }
    return undefined;
  }, obj);
}
