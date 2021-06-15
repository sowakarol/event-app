import { Types } from 'mongoose';

import ValidationError from '../errors/ValidationError';

const isValidId = (id) => Types.ObjectId.isValid(id);

const idValidation = async (req, _, next) => {
  const { id } = req.params;

  if (!id && id !== 0) {
    return next(new ValidationError('Validation Error', [{
      field: 'id',
      message: '"id" is required',
      invalidValue: null,
    }]));
  }

  if (!isValidId(id)) {
    return next(new ValidationError('Validation Error', [{
      field: 'id',
      message: 'Invalid "id" parameter',
      invalidValue: id,
    }]));
  }

  return next();
};

export default idValidation;
