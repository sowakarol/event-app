import { Event } from "../models/event.model";

class CreateEventDto {
  static toEntity(createEventDto) {
    return new Event({
      firstName: createEventDto.firstName,
      lastName: createEventDto.lastName,
      email: createEventDto.email,
      eventDate: createEventDto.eventDate,
    });
  }
}

class EventDto {
  static fromEntity(entity) {
    return {
      id: entity._id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      eventDate: entity.eventDate,
    };
  }

  static toEntity(eventDto) {
    return new Event({
      _id: eventDto._id,
      firstName: eventDto.firstName,
      lastName: eventDto.lastName,
      email: eventDto.email,
      eventDate: eventDto.eventDate,
    });
  }
}

export class EventService {
  async create(createEventDto) {
    try {
      let event = CreateEventDto.toEntity(createEventDto);
      await event.save();
      console.info("Async EventService/create event created", event);
      return EventDto.fromEntity(event);
    } catch (err) {
      console.error("Async EventService/create error", err);
      throw Error(err);
    }
  }
  async update() {}
  async get() {}
  async getAll() {
    const events = await Event.find();
    return events.map((event) => EventDto.fromEntity(event));
  }
}
