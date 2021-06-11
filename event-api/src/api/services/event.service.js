import EntityNotFoundError from '../errors/EntityNotFoundError';
import Event from '../models/event.model';
import CreateEventDto from './CreateEventDto';
import EventDto from './EventDto';

export const create = async (createEventDto) => {
  try {
    const event = CreateEventDto.toEntity(createEventDto);
    await event.save();
    return EventDto.fromEntity(event);
  } catch (err) {
    console.warn('Async EventService create error', err);
    throw err;
  }
};

export const getAll = async () => {
  const events = await Event.find();
  return events.map((event) => EventDto.fromEntity(event));
};

export const update = async (id, eventDto) => {
  try {
    const updatedEntity = await Event.findByIdAndUpdate(id, eventDto, {
      new: true,
    });

    return EventDto.fromEntity(updatedEntity);
  } catch (err) {
    console.warn('Async EventService update error', err);
    throw err;
  }
};

export const remove = async (id) => {
  try {
    await Event.findByIdAndRemove(id);
  } catch (err) {
    console.warn('Async EventService remove error', err);
    throw err;
  }
};

export const get = async (id) => {
  try {
    const event = await Event.findById(id);

    if (!event) {
      throw new EntityNotFoundError('Event', id);
    }

    return EventDto.fromEntity(event);
  } catch (err) {
    console.warn('Async EventService get error', err);
    throw err;
  }
};
