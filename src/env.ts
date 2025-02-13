import { config } from 'dotenv';
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

config();

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    PORT: z.coerce.number().default(3000),
    APP_ORIGIN: z.string().url().default('http://localhost:3000'),
    LOG_LEVEL: z
      .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
      .default('info'),
    RAWG_API_KEY: z.string().min(1),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: 'PUBLIC_',
  client: {
    // Example:
    // PUBLIC_BASE_URL: z.string().url().min(1),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    APP_ORIGIN: process.env.APP_ORIGIN,
    LOG_LEVEL: process.env.LOG_LEVEL,
    RAWG_API_KEY: process.env.RAWG_API_KEY,
  },

  emptyStringAsUndefined: true,
});
