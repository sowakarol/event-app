import React from 'react';

import EventForm from '../EventForm';
import { render, queryByAttribute } from '../../../../test.helpers';

test('can render with redux with defaults', () => {
  const dom = render(<EventForm />);
  expect(queryByAttribute('id', dom.container, 'first-name')).toBeTruthy();
});
