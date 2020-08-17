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
      return EventDto.fromEntity(event);
    } catch (err) {
      console.warn("Async EventService create error", err);
      throw err;
    }
  }

  async getAll() {
    const events = await Event.find();
    return events.map((event) => EventDto.fromEntity(event));
  }

  async update(id, eventDto) {
    try {
      const updatedEntity = await Event.findByIdAndUpdate(id, eventDto, {
        new: true,
      });

      return EventDto.fromEntity(updatedEntity);
    } catch (err) {
      console.warn("Async EventService update error", err);
      throw err;
    }
  }
  async delete(id) {
    try {
      await Event.findByIdAndRemove(id);
    } catch (err) {
      console.warn("Async EventService delete error", err);
      throw err;
    }
  }
  async get(id) {
    try {
      const event = await Event.findById(id);

      if (!event) {
        return;
      }

      return EventDto.fromEntity(event);
    } catch (err) {
      console.warn("Async EventService get error", err);
      throw err;
    }
  }
}
