import { OK, CREATED, INTERNAL_SERVER_ERROR } from "http-status";

export class EventController {
  constructor(eventService) {
    this.eventService = eventService;
  }
  async createEvent(req, res) {
    console.info("Async EventController/createEvent request", req.body);
    try {
      const savedEvent = await this.eventService.create(req.body);
      res.status(CREATED).json(savedEvent);
    } catch (err) {
      console.error("Async EventController/createEvent request error", err);
      res.status(INTERNAL_SERVER_ERROR);
    }
    res.status(CREATED).end();
  }
  async getAllEvents(req, res) {
    try {
      const events = await this.eventService.getAllEvents();
      res.json(events);
    } catch (err) {
      console.error(err);
    }
  }
  async getEvent(req, res) {}
  async updateEvent(req, res) {}
  async deleteEvent(req, res) {}
}
