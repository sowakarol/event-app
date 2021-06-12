import { connect } from 'mongoose';
import { env, port, mongodbConnectionUrl } from './config/vars';
import mongoDbOptions from './config/mongo';
import app from './config/express';
import logger from './api/services/logger';

connect(mongodbConnectionUrl, mongoDbOptions)
  .then(() => {
    logger.info('Connected to MongoDB', mongodbConnectionUrl);
  })
  .catch((err) => {
    logger.error('Error when connecting to MongoDB', err);
    process.exit(1);
  });

app.listen(port, () => logger.info(`Event API started on port ${port} (${env})`));

export default app;
