import { Router } from 'express';
import {
  getGames,
  getGameById,
} from '@/server/controllers/games.controller.js';

const gamesRouter = Router();

gamesRouter.get('/', getGames);
gamesRouter.get('/:id', getGameById);

export default gamesRouter;
