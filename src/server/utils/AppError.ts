import AppErrorCode from '@/server/constants/appErrorCode.js';
import { HttpStatusCode } from '@/server/constants/http.js';

/**
 * Custom error class for handling application errors
 * @extends Error
 * @param statusCode - HTTP status code
 * @param message - Error message
 * @param errorCode - Application error code
 */
class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
