import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GameDetails, GamesResponse } from '@/shared/types';
import type { GameQueryParams } from '@/shared/utils';
import {
  getCurrentDate,
  getLastYearDate,
  getNextYearDate,
  buildQueryString,
} from '@/shared/utils';
import { filterNsfwGames } from '@/server/utils/nsfwFilter';

// Define common query parameters
const COMMON_PAGE_SIZE = 10;

/**
 * Predefined query parameter configurations for different game lists.
 * These presets ensure consistent filtering across the application.
 *
 * popular: Games from the last year, sorted by rating
 * upcoming: Games releasing in the next year, sorted by popularity
 * new: Recently released games, sorted by release date
 * search: Games matching a search term
 */
export const QUERY_PRESETS = {
  popular: {
    dates: `${getLastYearDate()},${getCurrentDate()}`,
    ordering: '-rating',
    page_size: COMMON_PAGE_SIZE,
  },
  upcoming: {
    dates: `${getCurrentDate()},${getNextYearDate()}`,
    ordering: '-added',
    page_size: COMMON_PAGE_SIZE,
  },
  new: {
    dates: `${getLastYearDate()},${getCurrentDate()}`,
    ordering: '-released',
    page_size: COMMON_PAGE_SIZE,
  },
  search: (searchTerm: string) => ({
    search: searchTerm,
    page_size: COMMON_PAGE_SIZE,
  }),
} as const;

/**
 * RTK Query API definition for games-related endpoints.
 *
 * This API service uses RTK Query to handle:
 * - Automatic caching
 * - Request deduplication
 * - Polling
 * - Cache invalidation
 *
 * Type Parameters for endpoints:
 * builder.query<ReturnType, QueryArg>
 * - ReturnType: The type of data returned by the endpoint
 * - QueryArg: The type of argument accepted by the endpoint
 *
 * Example usage:
 * ```typescript
 * // In a component:
 * const { data, error, isLoading } = useGetGamesQuery({ page: 1, search: 'mario' });
 * const { data: gameDetails } = useGetGameByIdQuery(123);
 * ```
 */
export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    // Get games with optional filtering
    getGames: builder.query<GamesResponse, GameQueryParams | void>({
      query: params =>
        params ? `/games?${buildQueryString(params)}` : '/games',
      transformResponse: filterNsfwGames,
    }),

    // Get a single game by ID
    getGameById: builder.query<GameDetails, GameDetails['id']>({
      query: id => `/games/${id}`,
    }),

    // Get popular games from the last year
    getPopularGames: builder.query<GamesResponse, void>({
      query: () => `/games?${buildQueryString(QUERY_PRESETS.popular)}`,
      transformResponse: filterNsfwGames,
    }),

    // Get upcoming games for the next year
    getUpcomingGames: builder.query<GamesResponse, void>({
      query: () => `/games?${buildQueryString(QUERY_PRESETS.upcoming)}`,
      transformResponse: filterNsfwGames,
    }),

    // Get new releases from the last year
    getNewGames: builder.query<GamesResponse, void>({
      query: () => `/games?${buildQueryString(QUERY_PRESETS.new)}`,
      transformResponse: filterNsfwGames,
    }),

    // Search games by term
    searchGames: builder.query<GamesResponse, string>({
      query: searchTerm =>
        `/games?${buildQueryString(QUERY_PRESETS.search(searchTerm))}`,
      transformResponse: filterNsfwGames,
    }),
  }),
});
