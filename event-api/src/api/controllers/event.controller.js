import { OK, CREATED } from "http-status";

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
    try {
      const events = await this.eventService.getAll();
      res.status(OK).json(events).end();
    } catch (err) {
      console.error("Async EventController/getAllEvents error", err);
      next(err);
    }
  }

  async getEvent(req, res, next) {}
  async updateEvent(req, res, next) {}
  async deleteEvent(req, res, next) {}
}
