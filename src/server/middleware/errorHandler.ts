import { ErrorRequestHandler } from 'express';
import { Response } from 'express';
import { ZodError } from 'zod';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '@/server/constants/http.js';
import AppError from '@/server/utils/AppError.js';
import logger from '@/server/config/logger.js';

const handleZodError = (res: Response, error: ZodError) => {
  const errors = error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  res.status(BAD_REQUEST).json({
    status: 'error',
    timestamp: Date.now(),
    message: 'Bad Request',
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({
    status: 'error',
    timestamp: Date.now(),
    message: error.message,
    errorCode: error.errorCode,
  });
};

/**
 * Middleware to handle different types of errors
 * @param error - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = error.statusCode ?? INTERNAL_SERVER_ERROR;
  const message = error.message ?? 'Internal server error';

  logger.error(`PATH: ${req.path}`, { error });

  if (error instanceof ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  res.status(statusCode).json({
    status: 'error',
    timestamp: Date.now(),
    message,
  });
};

export default errorHandler;
