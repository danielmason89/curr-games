import { NextFunction, Request, Response } from 'express';

import AppError from '@/server/utils/AppError.js';
import AppErrorCode from '@/server/constants/appErrorCode.js';
import { NOT_FOUND } from '@/server/constants/http.js';

/**
 * Middleware to handle API route not found errors
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Only handle API routes
  if (req.path.startsWith('/api')) {
    next(
      new AppError(
        NOT_FOUND,
        `The requested route '(${req.method}) ${req.path}' was not found`,
        AppErrorCode.ROUTE_NOT_FOUND
      )
    );
  } else {
    // Pass non-API routes to next handler (Vite)
    next();
  }
};

export default notFoundHandler;
