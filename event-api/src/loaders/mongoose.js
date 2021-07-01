import { connect } from 'mongoose';

import mongoDbOptions from '../config/mongo';
import { MONGODB_URL } from '../config/config';
import logger from '../services/logger';

export default async () => {
  try {
    await connect(MONGODB_URL, mongoDbOptions);
    logger.info('Connected to MongoDB', MONGODB_URL);
  } catch (err) {
    logger.error('Error when connecting to MongoDB', err);
    process.exit(1);
  }
};
