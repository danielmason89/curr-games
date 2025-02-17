import type { store } from '@/client/store';

// TypeScript helpers for Redux store
// With RTK Query, we rarely need to use these directly since the generated hooks are fully typed
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
