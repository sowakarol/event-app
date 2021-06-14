import { Router } from 'express';
import { OK, CREATED } from 'http-status';

import EventValidator from '../../../validators/event.validator';
import IdValidator from '../../../validators/id.validator';
import {
  remove, get, getAll, update, create,
} from '../../../services/event.service';
import logger from '../../../services/logger';

const router = Router();

export const createEvent = async (req, res, next) => {
  logger.info('Async createEvent request', req.body);
  try {
    const savedEvent = await create(req.body);
    res.status(CREATED).json(savedEvent);
  } catch (err) {
    logger.error('Async createEvent error', err);
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info('Async getEvent request', id);
    const event = await get(id);
    res.json(event);
  } catch (err) {
    logger.error('Async getEvent error', err);
    next(err);
  }
};

const getAllEvents = async (_, res, next) => {
  try {
    const events = await getAll();
    res.json(events);
  } catch (err) {
    logger.error('Async getAllEvents error', err);
    next(err);
  }
};

const removeEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info('Async removeEvent request', id);
    await remove(id);
    res.sendStatus(OK);
  } catch (err) {
    logger.error('Async removeEvent error', err);
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info('Async updateEvent request', id);
    const updatedEvent = await update(id, req.body);
    res.json(updatedEvent);
  } catch (err) {
    logger.error('Async updateEvent error', err);
    next(err);
  }
};

router.get('/', getAllEvents);
router.post('/', EventValidator, createEvent);

router.get('/:id', IdValidator, getEvent);
router.put('/:id', EventValidator, IdValidator, updateEvent);
router.delete('/:id', IdValidator, removeEvent);

export default router;
