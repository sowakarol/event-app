import { OK, CREATED, NOT_FOUND } from 'http-status';
import ApiError from '../middlewares/apiError';

import {
  remove, get, getAll, update, create,
} from '../services/event.service';

export const createEvent = async (req, res, next) => {
  console.info('Async EventController/createEvent request', req.body);
  try {
    const savedEvent = await create(req.body);
    res.status(CREATED).json(savedEvent).end();
  } catch (err) {
    console.error('Async EventController/createEvent error', err);
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await getAll();
    res.status(OK).json(events).end();
  } catch (err) {
    console.error('Async EventController/getAllEvents error', err);
    next(err);
  }
};

export const getEvent = async (req, res, next) => {
  const { id } = req.params;
  console.info('Async EventController/getEvent request', id);
  try {
    const event = await get(id);
    if (!event) {
      throw new ApiError('Event not found', NOT_FOUND);
    }
    res.status(OK).json(event).end();
  } catch (err) {
    console.error('Async EventController/getEvent error', err);
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  const { id } = req.params;
  console.info('Async EventController/updateEvent request', id);
  try {
    const updatedEvent = await update(id, req.body);
    res.status(OK).json(updatedEvent).end();
  } catch (err) {
    console.error('Async EventController/updateEvent error', err);
    next(err);
  }
};

export const removeEvent = async (req, res, next) => {
  const { id } = req.params;
  console.info('Async EventController/removeEvent request', id);
  try {
    await remove(id);
    res.status(OK).end();
  } catch (err) {
    console.error('Async EventController/removeEvent error', err);
    next(err);
  }
};
