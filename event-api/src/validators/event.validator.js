import Joi from 'joi';

import ValidationError from '../errors/ValidationError';
import mapJoiErrors from './mapJoiErrors';

const schema = Joi.object({
  firstName: Joi.string()
    .trim(true)
    .required(),
  lastName: Joi.string()
    .trim(true)
    .required(),
  email: Joi.string().email().trim(true).required(),
  eventDate: Joi.date().iso().required(),
});

const eventValidation = (req, _, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    eventDate: req.body.eventDate,
  };

  const { value, error } = schema.validate(payload);

  if (error) {
    return next(new ValidationError('Validation Error', mapJoiErrors(error.details)));
  }

  req.validatedEntity = value;
  return next();
};

export default eventValidation;
