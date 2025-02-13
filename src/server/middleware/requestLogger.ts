import { NextFunction, Request, Response } from 'express';
import logger from '@/server/config/logger.js';

/**
 * Middleware to log HTTP requests and responses
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.http(`Request: ${req.method} ${req.originalUrl}`, {
    headers: req.headers,
    body: req.body,
  });

  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http(
      `Response: ${res.statusCode} ${req.method} ${req.originalUrl} ${duration}ms`,
      {
        headers: res.getHeaders(),
      }
    );
  });

  next();
};
