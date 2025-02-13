import { Router } from 'express';
import gamesRouter from './games.route.js';

const router = Router();

router.use('/games', gamesRouter);

export default router;
