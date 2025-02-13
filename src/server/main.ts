import express from 'express';
import ViteExpress from 'vite-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from '@/env.js';
import logger from './config/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import { limiter } from '@/server/lib/rateLimit.js';

const app = express();

logger.info(`Initializing server in the ${env.NODE_ENV} environment.`);

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(ViteExpress.static());
logger.info('Middleware initialized.');

app.use('/api', limiter, routes);
logger.info('Routes initialized.');

app.use(notFoundHandler);
app.use(errorHandler);
logger.info('Error handling initialized.');

ViteExpress.listen(app, env.PORT, () =>
  logger.info(
    `Server is running on port ${env.PORT} (Environment: ${env.NODE_ENV})`
  )
);
