import { z } from 'zod';

// Platform schemas
const platformBaseSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

const platformRequirementsSchema = z
  .object({
    minimum: z.string().optional(),
    recommended: z.string().optional(),
  })
  .nullable()
  .optional();

const platformDetailSchema = z.object({
  platform: platformBaseSchema,
  released_at: z.string().nullable().optional(),
  requirements: platformRequirementsSchema,
});

// ESRB Rating schema
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

// Rating schema
const ratingSchema = z.object({
  id: z.number(),
  title: z.string(),
  count: z.number(),
  percent: z.number(),
});

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  language: z.string(),
  games_count: z.number(),
  image_background: z.string(),
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
    rating_top: z.number().optional(),
    ratings: z.array(ratingSchema).optional(),
    ratings_count: z.number().optional(),
    reviews_text_count: z.number().optional(),
    added: z.number().optional(),
    added_by_status: z.record(z.string(), z.number()).nullable().optional(),
    metacritic: z.number().nullable().optional(),
    playtime: z.number().optional(),
    suggestions_count: z.number().optional(),
    tags: z.array(tagSchema).optional(),
    updated: z.string(),
    esrb_rating: esrbRatingSchema.optional(),
    platforms: z.array(platformDetailSchema).nullable().optional(),
  })
  .partial();

// Response schema for games list
export const gamesResponseSchema = z
  .object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(gameSchema),
    user_platforms: z.boolean().optional(),
  })
  .passthrough();

// Metacritic platform schema
const metacriticPlatformSchema = z.object({
  metascore: z.number(),
  url: z.string(),
});

// Game details schema
export const gameDetailsSchema = gameSchema
  .extend({
    name_original: z.string(),
    description: z.string(),
    metacritic_platforms: z.array(metacriticPlatformSchema).optional(),
    background_image_additional: z.string().nullable().optional(),
    website: z.string(),
    reactions: z.record(z.string(), z.unknown()).nullable().optional(),
    screenshots_count: z.number(),
    movies_count: z.number(),
    creators_count: z.number(),
    achievements_count: z.number(),
    parent_achievements_count: z.number(),
    reddit_url: z.string(),
    reddit_name: z.string().nullable(),
    reddit_description: z.string().nullable(),
    reddit_logo: z.string().nullable(),
    reddit_count: z.number(),
    twitch_count: z.number(),
    youtube_count: z.number(),
    reviews_text_count: z.number(),
    ratings_count: z.number(),
    suggestions_count: z.number(),
    alternative_names: z.array(z.string()),
    metacritic_url: z.string(),
    parents_count: z.number(),
    additions_count: z.number(),
    game_series_count: z.number(),
  })
  .partial();

// Query parameter schemas
export const gameQuerySchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  search: z.string().optional(),
  search_precise: z.boolean().optional(),
  search_exact: z.boolean().optional(),
  parent_platforms: z.string().optional(),
  platforms: z.string().optional(),
  stores: z.string().optional(),
  developers: z.string().optional(),
  publishers: z.string().optional(),
  genres: z.string().optional(),
  tags: z.array(tagSchema).optional(),
  creators: z.string().optional(),
  dates: z.string().optional(),
  updated: z.string().optional(),
  platforms_count: z.number().optional(),
  metacritic: z.string().optional(),
  exclude_collection: z.number().optional(),
  exclude_additions: z.boolean().optional(),
  exclude_parents: z.boolean().optional(),
  exclude_game_series: z.boolean().optional(),
  exclude_stores: z.string().optional(),
  ordering: z.string().optional(),
});

// Type exports
export type Game = z.infer<typeof gameSchema>;
export type GamesResponse = z.infer<typeof gamesResponseSchema>;
export type GameDetails = z.infer<typeof gameDetailsSchema>;
export type GameQueryParams = z.infer<typeof gameQuerySchema>;
export type PlatformDetails = z.infer<typeof platformDetailSchema>;
