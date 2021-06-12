import EventFormSchema from '../EventForm.schema';

const sampleEvent = {
  firstName: 'Sample first name',
  lastName: 'Sample last name',
  eventDate: new Date(),
  email: 'sample@email.com',
};

test('Should pass validation when event is OK', async () => {
  const result = await EventFormSchema.isValid(sampleEvent);
  expect(result).toBe(true);
});

test('Should fail validation when event does not contain first name', async () => {
  const result = await EventFormSchema.isValid({
    ...sampleEvent,
    firstName: null,
  });
  expect(result).toBe(false);
});

test('Should fail validation when event does not contain last name', async () => {
  const result = await EventFormSchema.isValid({
    ...sampleEvent,
    lastName: null,
  });
  expect(result).toBe(false);
});

test('Should fail validation when event does not contain email', async () => {
  const result = await EventFormSchema.isValid({
    ...sampleEvent,
    email: null,
  });
  expect(result).toBe(false);
});

test('Should fail validation when event does not contain event date', async () => {
  const result = await EventFormSchema.isValid({
    ...sampleEvent,
    eventDate: null,
  });
  expect(result).toBe(false);
});

test('Should fail validation when event date has invalid format', async () => {
  const result = await EventFormSchema.isValid({
    ...sampleEvent,
    eventDate: 'invalid-test-value',
  });
  expect(result).toBe(false);
});

test('Should fail validation when email has invalid format', async () => {
  const result = await EventFormSchema.isValid({
    ...sampleEvent,
    email: 'invalid-test-value',
  });
  expect(result).toBe(false);
});
