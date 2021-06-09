import React from 'react';
import { EventFormHeader } from './components/EventFromHeader/EventFormHeader.js';
import EventForm from './components/EventForm.js';
import {
  render, rtlRender, queryByAttribute,
} from './test.helpers.js';

test('EventFormHeader renders Create Event text', () => {
  const { getByText } = rtlRender(<EventFormHeader />);
  const linkElement = getByText(/Create Event/i);
  expect(linkElement).toBeInTheDocument();
});

test('can render with redux with defaults', () => {
  const dom = render(<EventForm />);
  expect(queryByAttribute('id', dom.container, 'first-name')).toBeTruthy();
});
