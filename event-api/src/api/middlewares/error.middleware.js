import { INTERNAL_SERVER_ERROR } from 'http-status';
import ValidationError from './apiError';

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      errors: error.errors,
      message: error.message,
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
};
