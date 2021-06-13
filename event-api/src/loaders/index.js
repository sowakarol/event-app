import mongooseLoader from './mongoose';
import expressLoader from './express';

const loaders = async ({ app }) => {
  await mongooseLoader();
  await expressLoader({ app });
};

export default loaders;
