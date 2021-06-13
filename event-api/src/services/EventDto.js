class EventDto {
  static fromEntity(entity) {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: entity._id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      eventDate: entity.eventDate,
    };
  }

  static toEntity(eventDto) {
    return new Event({
      // eslint-disable-next-line no-underscore-dangle
      _id: eventDto._id,
      firstName: eventDto.firstName,
      lastName: eventDto.lastName,
      email: eventDto.email,
      eventDate: eventDto.eventDate,
    });
  }
}

export default EventDto;
