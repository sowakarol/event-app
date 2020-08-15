import { OK, CREATED } from "http-status";

export class EventController {
  constructor(eventService) {
    this.eventService = eventService;
  }
  async createEvent(req, res) {
    await this.eventService.create();
    res.status(CREATED).end();
  }
  async getAllEvents(req, res) {
    res.status(OK).end();
  }
  async getEvent(req, res) {}
  async updateEvent(req, res) {}
  async deleteEvent(req, res) {}
}
