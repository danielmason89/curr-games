import type { GamesResponse } from '../lib/schemas.js';

const nsfwTags = ['nsfw', 'erotic', 'hentai', 'sexual content', 'nudity'];
const nsfwKeywords = [
  'sex',
  'adult',
  'erotic',
  'hentai',
  'sexual',
  'nsfw',
  'nudity',
];

export const filterNsfwGames = (res: GamesResponse): GamesResponse => {
  return {
    ...res,
    results: res.results.filter(game => {
      const hasNsfwTag = game.tags?.some(tag =>
        nsfwTags.includes(tag.name.toLowerCase())
      );

      const hasNsfwTitle = nsfwKeywords.some(keyword =>
        game.name?.toLowerCase().includes(keyword)
      );

      return !(hasNsfwTag || hasNsfwTitle);
    }),
  };
};
