import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { OK, CREATED } from 'http-status';

import {
  remove, get, getAll, update, create,
} from '../../services/event.service';
import { isValidId } from '../../models/event.model';
import ValidationError from '../../errors/ValidationError';

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

const idParamValidator = [
  param('id').not().isEmpty(),
  param('id').custom((value) => isValidId(value)),
];

const validate = (req, _, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    console.warn('POST / validation errors', result);
    return next(new ValidationError('Validation error', result.array()));
  }
  return next();
};

export const createEvent = async (req, res, next) => {
  console.info('Async createEvent request', req.body);
  try {
    const savedEvent = await create(req.body);
    res.status(CREATED).json(savedEvent);
  } catch (err) {
    console.error('Async createEvent error', err);
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.info('Async getEvent request', id);
    const event = await get(id);
    res.json(event);
  } catch (err) {
    console.error('Async getEvent error', err);
    next(err);
  }
};

const getAllEvents = async (_, res, next) => {
  try {
    const events = await getAll();
    res.json(events);
  } catch (err) {
    console.error('Async getAllEvents error', err);
    next(err);
  }
};

const removeEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.info('Async removeEvent request', id);
    await remove(id);
    res.sendStatus(OK);
  } catch (err) {
    console.error('Async removeEvent error', err);
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.info('Async updateEvent request', id);
    const updatedEvent = await update(id, req.body);
    res.json(updatedEvent);
  } catch (err) {
    console.error('Async updateEvent error', err);
    next(err);
  }
};

router.get('/', getAllEvents);
router.post('/', createEventValidator, validate, createEvent);

router.get('/:id', idParamValidator, validate, getEvent);
router.put('/:id', createEventValidator.concat(idParamValidator), validate, updateEvent);
router.delete('/:id', idParamValidator, validate, removeEvent);

export default router;
