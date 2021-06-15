import React from 'react';

import EventFormHeader from '../EventFormHeader';
import { rtlRender } from '../../../../test.helpers';

test('EventFormHeader renders Create Event text', () => {
  const { getByText } = rtlRender(<EventFormHeader />);
  const linkElement = getByText(/Create Event/i);
  expect(linkElement).toBeInTheDocument();
});
