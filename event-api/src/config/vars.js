if (process.env.NODE_ENV === 'TEST') {
  process.env.MONGODB_URL = 'mongodb://mongo-integration-test:27017/testdb';
}

export const env = process.env.NODE_ENV || 'DEV';
export const port = process.env.PORT || 5000;

export const mongodbConnectionUrl = process.env.MONGODB_URL || 'mongodb://mongo:27017/eventdb';
