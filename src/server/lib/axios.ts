import axios from 'axios';
import { config } from '@/config.js';
import { env } from '@/env.js';

export const rawgApi = axios.create({
  baseURL: config.rawgBaseUrl,
  params: {
    key: env.RAWG_API_KEY,
  },
});
