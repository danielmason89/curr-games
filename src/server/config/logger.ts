import { createLogger, format, transports } from 'winston';
import { env } from '@/env.js';

const { combine, timestamp, errors, splat, json, printf, colorize } = format;
const timestampFormat = 'YYYY-MM-DD hh:mm:ss A';

const errorFilter = format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const logger = createLogger({
  level: env.LOG_LEVEL,
  format: combine(
    timestamp({
      format: timestampFormat,
    }),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [
    new transports.File({
      filename: 'combined.log',
    }),
    new transports.File({
      filename: 'app-error.log',
      level: 'error',
      format: combine(
        errorFilter(),
        timestamp({ format: timestampFormat }),
        json()
      ),
    }),
    new transports.File({
      filename: 'app-info.log',
      level: 'info',
      format: combine(
        infoFilter(),
        timestamp({ format: timestampFormat }),
        json()
      ),
    }),
  ],
});

if (env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        colorize(),
        printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      ),
    })
  );
}

export default logger;
