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

// API-specific middleware
const apiRouter = express.Router();
apiRouter.use(requestLogger);
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));
apiRouter.use(
  cors({
    origin: env.APP_ORIGIN,
    credentials: true,
  })
);
apiRouter.use(cookieParser());
apiRouter.use(limiter);
apiRouter.use('/', routes);

// Mount API routes with its error handlers
app.use('/api', apiRouter);
app.use('/api', notFoundHandler);
app.use('/api', errorHandler);
logger.info('API routes and error handling initialized.');

// Static/client middleware - should be after API routes
app.use(ViteExpress.static());
logger.info('Static middleware initialized.');

ViteExpress.listen(app, env.PORT, () =>
  logger.info(
    `Server is running on port ${env.PORT} (Environment: ${env.NODE_ENV})`
  )
);
