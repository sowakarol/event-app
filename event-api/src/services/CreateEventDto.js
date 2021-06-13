import Event from '../models/event.model';

class CreateEventDto {
  static toEntity({
    firstName,
    lastName,
    email,
    eventDate,
  }) {
    return new Event({
      firstName,
      lastName,
      email,
      eventDate,
    });
  }
}

export default CreateEventDto;
