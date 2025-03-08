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
import helmet from 'helmet';

const app = express();
ViteExpress.config({mode: env.NODE_ENV === 'production' ? 'production' : 'development'});
logger.info(`Initializing server in the ${env.NODE_ENV} environment.`);

// Remove X-Powered-By header at app level
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'", // Required for Vite HMR
          'https:', // Allow loading scripts from HTTPS sources
        ],
        'img-src': ["'self'", 'data:', 'https:'],
        'style-src': ["'self'", "'unsafe-inline'"],
        'connect-src': ["'self'", 'ws:', 'wss:'], // Required for WebSocket connections
      },
    },
    hidePoweredBy: true, // Removes X-Powered-By header
  })
);

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
