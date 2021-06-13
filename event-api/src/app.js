import express from 'express';
import { env, port } from './config/vars';
import logger from './services/logger';

import loaders from './loaders';

const app = express();

const startServer = async ({ app: expressApp }) => {
  await loaders({ app: expressApp });

  expressApp.listen(port, (err) => {
    if (err) {
      logger.error(`Event API ${port} (${env}) terminated:`, err);
      return;
    }
    logger.info(`Event API started on port ${port} (${env})`);
  });
};

startServer({ app });

export default app;
