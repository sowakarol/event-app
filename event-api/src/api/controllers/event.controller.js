import { OK, CREATED, NOT_FOUND } from "http-status";
import { ApiError } from "../middlewares/apiError";

export class EventController {
  constructor(eventService) {
    this.eventService = eventService;
  }
  async createEvent(req, res, next) {
    console.info("Async EventController/createEvent request", req.body);
    try {
      const savedEvent = await this.eventService.create(req.body);
      res.status(CREATED).json(savedEvent).end();
    } catch (err) {
      console.error("Async EventController/createEvent error", err);
      next(err);
    }
  }
  async getAllEvents(req, res) {
    console.info("Async EventController/getAllEvents request");
    try {
      const events = await this.eventService.getAll();
      res.status(OK).json(events).end();
    } catch (err) {
      console.error("Async EventController/getAllEvents error", err);
      next(err);
    }
  }

  async getEvent(req, res, next) {
    const id = req.params.id;
    console.info("Async EventController/getEvent request", id);
    try {
      const event = await this.eventService.get(id);
      if (!event) {
        return next(new ApiError("Event not found", NOT_FOUND));
      }
      res.status(OK).json(event).end();
    } catch (err) {
      console.error("Async EventController/getEvent error", err);
      next(err);
    }
  }
  async updateEvent(req, res, next) {
    const id = req.params.id;
    console.info("Async EventController/updateEvent request", id);
    try {
      const updatedEvent = await this.eventService.update(id, req.body);
      res.status(OK).json(updatedEvent).end();
    } catch (err) {
      console.error("Async EventController/updateEvent error", err);
      next(err);
    }
  }
  async deleteEvent(req, res, next) {
    const id = req.params.id;
    console.info("Async EventController/deleteEvent request", id);
    try {
      await this.eventService.delete(id);
      res.status(OK).end();
    } catch (err) {
      console.error("Async EventController/deleteEvent error", err);
      next(err);
    }
  }
}
