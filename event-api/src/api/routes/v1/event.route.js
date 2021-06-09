import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { BAD_REQUEST } from 'http-status';
import { EventController } from '../../controllers/event.controller';
import { EventService } from '../../services/event.service';
import { ApiError } from '../../middlewares/apiError';

const router = Router();
router.eventController = new EventController(new EventService());

const errorFormatter = ({
  location, msg, param, value, nestedErrors,
}) => `${location}[${param}]: ${msg}`;

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
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    console.warn('POST / validation errors', errors);
    return next(new ApiError(errors.array().toString(), BAD_REQUEST));
  }
  router.eventController.createEvent(req, res, next);
});

router.get('/', (req, res, next) => router.eventController.getAllEvents(req, res, next));

router.get('/:id', idParamNoEmptyValidator, (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    console.warn('GET /:id validation errors', errors);
    return next(new ApiError(errors.array().toString(), BAD_REQUEST));
  }
  router.eventController.getEvent(req, res, next);
});

router.delete('/:id', idParamNoEmptyValidator, (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    console.warn('DELETE /:id validation errors', errors);
    return next(new ApiError(errors.array().toString(), BAD_REQUEST));
  }
  router.eventController.deleteEvent(req, res, next);
});

router.put(
  '/:id',
  createEventValidator.concat(idParamNoEmptyValidator),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      console.warn('PUT /:id validation errors', errors);
      return next(new ApiError(errors.array().toString(), BAD_REQUEST));
    }
    router.eventController.updateEvent(req, res, next);
  },
);

export default router;
