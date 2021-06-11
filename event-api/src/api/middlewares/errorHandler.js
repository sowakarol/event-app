import { INTERNAL_SERVER_ERROR } from 'http-status';
import StatusCodeError from '../errors/StatusCodeError';

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  if (error instanceof StatusCodeError) {
    return res.status(error.statusCode).json({
      errors: error.errors,
      message: error.message,
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
};
