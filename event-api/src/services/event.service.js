import EntityNotFoundError from '../errors/EntityNotFoundError';
import Event from '../models/event.model';
import CreateEventDto from './CreateEventDto';
import EventDto from './EventDto';

export const create = async (createEventDto) => {
  const event = CreateEventDto.toEntity(createEventDto);
  await event.save();
  return EventDto.fromEntity(event);
};

export const getAll = async () => {
  const events = await Event.find();
  return events.map((event) => EventDto.fromEntity(event));
};

export const update = async (id, eventDto) => {
  const updatedEntity = await Event.findByIdAndUpdate(id, eventDto, {
    new: true,
  });

  return EventDto.fromEntity(updatedEntity);
};

export const remove = async (id) => {
  await Event.findByIdAndRemove(id);
};

export const get = async (id) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new EntityNotFoundError('Event', id);
  }

  return EventDto.fromEntity(event);
};
