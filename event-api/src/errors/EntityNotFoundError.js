import { NOT_FOUND } from 'http-status';
import StatusCodeError from './StatusCodeError';

class EntityNotFoundError extends StatusCodeError {
  constructor(entityName, id) {
    super(`${entityName} with id ${id} not found`, NOT_FOUND);

    this.id = id;
  }
}

export default EntityNotFoundError;
