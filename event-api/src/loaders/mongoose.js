import { connect } from 'mongoose';

import mongoDbOptions from '../config/mongo';
import { mongodbConnectionUrl } from '../config/vars';
import logger from '../services/logger';

export default async () => {
  try {
    await connect(mongodbConnectionUrl, mongoDbOptions);
    logger.info('Connected to MongoDB', mongodbConnectionUrl);
  } catch (err) {
    logger.error('Error when connecting to MongoDB', err);
    process.exit(1);
  }
};
