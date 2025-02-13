import { z } from 'zod';

// Shared route parameter schemas
export const gameIdSchema = z.coerce
  .number()
  .int('Game ID must be an integer')
  .positive('Game ID must be a positive integer')
  .brand<'GameId'>();

export type GameId = z.infer<typeof gameIdSchema>;

// Route params objects
export const gameParamsSchema = z.object({
  id: gameIdSchema,
});

export type GameParams = z.infer<typeof gameParamsSchema>;
