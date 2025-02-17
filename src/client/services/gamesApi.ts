import type { Game } from '@/shared/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our API service using RTK Query
// This automatically generates hooks and manages the data fetching/caching logic
export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  // Configure the base API URL
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  // Define endpoints for data fetching operations
  // RTK Query will generate hooks like useGetGamesQuery automatically
  endpoints: builder => ({
    // For each query, we define two generic type parameters:
    // 1. ResultType: The type of data the API will return (Game[])
    // 2. QueryArg: The type of argument the query accepts (void means no argument)
    getGames: builder.query<Game[], void>({
      query: () => '/games',
    }),
    // Here, QueryArg is Game['id'] (the type of the id field from Game)
    // This ensures type safety when calling the hook with an id
    // We could manually define the type for the id argument, but this is more type-safe as it uses the id from the Game type
    getGameById: builder.query<Game, Game['id']>({
      query: id => `/games/${id}`,
    }),
  }),
});
