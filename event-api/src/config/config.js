import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  NODE_ENV,
  MONGODB_URL,
} = process.env;
