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
}

export default EventDto;
