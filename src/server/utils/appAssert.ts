import assert from 'node:assert';

import AppError from '@/server/utils/AppError.js';
import AppErrorCode from '@/server/constants/appErrorCode.js';
import { HttpStatusCode } from '@/server/constants/http.js';

type AppAssert = (
  condition: boolean | undefined | null,
  statusCode: HttpStatusCode,
  message: string,
  errorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 * @param condition - The condition to assert.
 * @param statusCode - The HTTP status code to use in the AppError.
 * @param errorCode - The error code to use in the AppError.
 * @param message - The message to use in the AppError.
 */
const appAssert: AppAssert = (condition, statusCode, message, errorCode) =>
  assert(condition, new AppError(statusCode, message, errorCode));

export default appAssert;
