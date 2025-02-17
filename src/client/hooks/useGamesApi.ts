import { gamesApi } from '@/client/services/gamesApi';

// Re-export the auto-generated hooks from RTK Query
// These hooks handle all the data fetching, caching, and loading states automatically
// We could simplify this by exporting directly from the service file, but this approach
// puts all hooks in one place which makes it easier to manage.
export const { useGetGamesQuery, useGetGameByIdQuery } = gamesApi;
