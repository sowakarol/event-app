import { connect } from 'mongoose';
import { env, port, mongodbConnectionUrl } from './config/vars';
import { mongoDbOptions } from './config/mongo';
import { app } from './config/express';

connect(mongodbConnectionUrl, mongoDbOptions)
  .then(() => {
    console.info('Connected to MongoDB', mongodbConnectionUrl);
  })
  .catch((err) => {
    console.error('Error when connecting to MongoDB', err);
    process.exit(1);
  });

app.listen(port, () => console.info(`Event API started on port ${port} (${env})`));

export default app;
