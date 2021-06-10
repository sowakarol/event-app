import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { BAD_REQUEST } from 'http-status';
import {
  createEvent, removeEvent, getAllEvents, getEvent, updateEvent,
} from '../../controllers/event.controller';
import ValidationError from '../../middlewares/apiError';

const router = Router();

const errorFormatter = ({
  msg, param: field, value,
}) => ({
  field,
  message: msg,
  invalidValue: value,
});

const createEventValidator = [
  body('email').isEmail(),
  body('firstName').not().isEmpty(),
  body('lastName').not().isEmpty(),
  body('eventDate').custom((value) => {
    if (value) {
      const dateParsed = new Date(Date.parse(value));
      if (
        dateParsed.toISOString() === value
        && dateParsed.toUTCString() === new Date(value).toUTCString()
      ) {
        return value;
      }
      throw new Error('eventDate value not in ISO8601');
    } else {
      throw new Error('eventDate required');
    }
  }),
];

const idParamNoEmptyValidator = [param('id').not().isEmpty()];

router.post('/', createEventValidator, (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    console.warn('POST / validation errors aaa', result);
    return next(new ValidationError('Validation error', result.array(), BAD_REQUEST));
  }
  return createEvent(req, res, next);
});

router.get('/', (req, res, next) => getAllEvents(req, res, next));

router.get('/:id', idParamNoEmptyValidator, (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    console.warn('GET /:id validation errors', result);
    return next(new ValidationError(result.array(), BAD_REQUEST));
  }
  return getEvent(req, res, next);
});

router.delete('/:id', idParamNoEmptyValidator, (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    console.warn('DELETE /:id validation errors', result);
    return next(new ValidationError('Validation error', result.array(), BAD_REQUEST));
  }
  return removeEvent(req, res, next);
});

router.put(
  '/:id',
  createEventValidator.concat(idParamNoEmptyValidator),
  (req, res, next) => {
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      console.warn('PUT /:id validation errors', result);
      return next(new ValidationError('Validation error', result.array(), BAD_REQUEST));
    }
    return updateEvent(req, res, next);
  },
);

export default router;
