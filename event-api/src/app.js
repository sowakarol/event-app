import express from 'express';
import { NODE_ENV, PORT } from './config/config';
import logger from './services/logger';

import loaders from './loaders';

const app = express();

const startServer = async ({ app: expressApp }) => {
  await loaders({ app: expressApp });

  expressApp.listen(PORT, (err) => {
    if (err) {
      logger.error(`Event API ${PORT} (${NODE_ENV}) terminated:`, err);
      return;
    }
    logger.info(`Event API started on port ${PORT} (${NODE_ENV})`);
  });
};

startServer({ app });

export default app;
