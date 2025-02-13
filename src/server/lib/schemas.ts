import { z } from 'zod';

// Base schemas
const platformSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const platformDetailSchema = z.object({
  platform: platformSchema,
  released_at: z.string().nullable(),
  requirements: z
    .object({
      minimum: z.string().optional(),
      recommended: z.string().optional(),
    })
    .nullable()
    .optional(),
});

const esrbRatingSchema = z
  .object({
    id: z.number(),
    slug: z.enum([
      'everyone',
      'everyone-10-plus',
      'teen',
      'mature',
      'adults-only',
      'rating-pending',
    ]),
    name: z.enum([
      'Everyone',
      'Everyone 10+',
      'Teen',
      'Mature',
      'Adults Only',
      'Rating Pending',
    ]),
  })
  .nullable();

const ratingSchema = z.object({
  id: z.number(),
  title: z.string(),
  count: z.number(),
  percent: z.number(),
});

const metacriticPlatformSchema = z.object({
  metascore: z.number(),
  url: z.string(),
});

// Base game schema (for list endpoint)
export const gameSchema = z
  .object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    released: z.string().nullable(),
    tba: z.boolean(),
    background_image: z.string().nullable(),
    rating: z.number(),
    rating_top: z.number(),
    ratings: z.array(ratingSchema),
    ratings_count: z.number(),
    reviews_text_count: z.coerce.number(),
    added: z.number(),
    added_by_status: z.record(z.string(), z.number()),
    metacritic: z.number().nullable(),
    playtime: z.number(),
    suggestions_count: z.number(),
    updated: z.string(),
    esrb_rating: esrbRatingSchema,
    platforms: z.array(platformDetailSchema).nullable(),
  })
  .partial();

// Response schema for games list
export const gamesResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(gameSchema),
});

// Extended schema for game details endpoint
export const gameDetailsSchema = gameSchema
  .extend({
    name_original: z.string(),
    description: z.string(),
    metacritic_platforms: z.array(metacriticPlatformSchema),
    background_image_additional: z.string().nullable(),
    website: z.string(),
    reactions: z.record(z.string(), z.unknown()),
    screenshots_count: z.number(),
    movies_count: z.number(),
    creators_count: z.number(),
    achievements_count: z.number(),
    parent_achievements_count: z.coerce.number(),
    reddit_url: z.string(),
    reddit_name: z.string().nullable(),
    reddit_description: z.string().nullable(),
    reddit_logo: z.string().nullable(),
    reddit_count: z.number(),
    twitch_count: z.coerce.number(),
    youtube_count: z.coerce.number(),
    reviews_text_count: z.coerce.number(),
    ratings_count: z.number(),
    suggestions_count: z.number(),
    alternative_names: z.array(z.string()),
    metacritic_url: z.string(),
    parents_count: z.number(),
    additions_count: z.number(),
    game_series_count: z.number(),
  })
  .partial();

// Type exports
export type Game = z.infer<typeof gameSchema>;
export type GamesResponse = z.infer<typeof gamesResponseSchema>;
export type GameDetails = z.infer<typeof gameDetailsSchema>;
