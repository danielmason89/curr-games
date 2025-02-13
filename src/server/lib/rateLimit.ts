import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per window
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Includes RateLimit headers
  legacyHeaders: false, // Disables old headers
});
