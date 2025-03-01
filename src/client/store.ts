// Configure Redux store with RTK Query
// Unlike traditional Redux, we don't need to write reducers or actions
// RTK Query handles the state management automatically
import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from './services/gamesApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(gamesApi.middleware),
});
