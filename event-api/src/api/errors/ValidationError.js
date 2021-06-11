import { BAD_REQUEST } from 'http-status';
import StatusCodeError from './StatusCodeError';

class ValidationError extends StatusCodeError {
  constructor(message, errors) {
    super(message, BAD_REQUEST);

    this.errors = errors;
  }
}

export default ValidationError;
