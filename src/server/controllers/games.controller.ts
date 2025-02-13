import catchErrors from '@/server/utils/catchErrors.js';
import { BAD_REQUEST, OK } from '@/server/constants/http.js';
import * as gamesService from '@/server/services/games.service.js';
import logger from '@/server/config/logger.js';
import { gameParamsSchema } from '@/shared/schemas.js';

export const getGames = catchErrors(async (req, res) => {
  logger.info('Processing games request');
  const games = await gamesService.getGames();
  res.status(OK).json(games);
});

export const getGameById = catchErrors(async (req, res) => {
  const result = gameParamsSchema.safeParse(req.params);
  if (!result.success) {
    logger.error('Invalid game ID parameter', {
      params: req.params,
      error: result.error.format(),
    });
    res
      .status(BAD_REQUEST)
      .json({ error: 'Invalid parameter', details: result.error.format() });
    return;
  }

  logger.info('Processing game request', { gameId: result.data.id });
  const game = await gamesService.getGameById(result.data.id);
  res.status(OK).json(game);
});
