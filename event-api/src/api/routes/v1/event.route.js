import { Router } from "express";
import { EventController } from "../../controllers/event.controller";
import { EventService } from "../../services/event.service";
import { body, validationResult } from "express-validator";
import { BAD_REQUEST } from "http-status";
import { ApiError } from "../../middlewares/apiError";

const router = Router();
router.eventController = new EventController(new EventService());

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

router.post(
  "/",
  [
    body("email").isEmail(),
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    body("eventDate").custom((value) => {
      if (value) {
        const dateParsed = new Date(Date.parse(value));
        console.error(dateParsed)
        if (
          dateParsed.toISOString() === value &&
          dateParsed.toUTCString() === new Date(value).toUTCString()
        ) {
          return value;
        } else {
            throw new Error('eventDate value not in ISO8601')
        }
      } else {
          throw new Error('eventDate required')
      }
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      console.warn("Event POST / validation", errors.array());
      return next(new ApiError(errors.array().toString(), BAD_REQUEST));
    }
    router.eventController.createEvent(req, res, next);
  }
);

router.get("/", (req, res, next) =>
  router.eventController.getAllEvents(req, res, next)
);

export default router;
