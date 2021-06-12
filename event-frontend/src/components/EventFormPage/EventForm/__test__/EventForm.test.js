import React from 'react';

import EventForm from '../EventForm';
import {
  render, queryByAttribute, fireEvent, waitFor,
} from '../../../../test.helpers';
import createEventService from '../../../../service/createEvent.service';

jest.mock('../../../../service/createEvent.service', () => jest.fn(() => ({ status: 201 })));

test('can render with first name field', () => {
  const { container } = render(<EventForm />);

  expect(queryByAttribute('id', container, 'firstName')).toBeTruthy();
});

test('can render with last name field', () => {
  const { container } = render(<EventForm />);

  expect(queryByAttribute('id', container, 'lastName')).toBeTruthy();
});

test('can render with email field', () => {
  const { container } = render(<EventForm />);

  expect(queryByAttribute('id', container, 'email')).toBeTruthy();
});

test('can render with event date field', () => {
  const { container } = render(<EventForm />);

  expect(queryByAttribute('id', container, 'eventDate')).toBeTruthy();
});

test('can render with submit button', () => {
  const { container } = render(<EventForm />);

  expect(queryByAttribute('type', container, 'submit')).toBeTruthy();
});

test('submits correct values', async () => {
  // given
  const { container } = render(<EventForm />);

  // when
  const firstName = queryByAttribute('id', container, 'firstName');
  const lastName = queryByAttribute('id', container, 'lastName');
  const email = queryByAttribute('id', container, 'email');
  const submit = queryByAttribute('type', container, 'submit');

  await waitFor(() => {
    fireEvent.change(firstName, {
      target: {
        value: 'mockFirstName',
      },
    });
  });

  await waitFor(() => {
    fireEvent.change(lastName, {
      target: {
        value: 'mockLastName',
      },
    });
  });

  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: 'mock@email.com',
      },
    });
  });

  await waitFor(() => {
    fireEvent.click(submit);
  });

  expect(createEventService).toHaveBeenCalledWith(
    expect.objectContaining({
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      email: 'mock@email.com',
      eventDate: expect.any(String),
    }),
  );
});
