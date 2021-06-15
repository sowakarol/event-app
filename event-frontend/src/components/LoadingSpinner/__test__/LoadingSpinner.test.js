import React from 'react';
import { rtlRender } from '../../../test.helpers';

import LoadingSpinner from '../LoadingSpinner';

test('renders loading circle', () => {
  const { container } = rtlRender(<LoadingSpinner />);
  const circle = container.querySelector('circle');
  expect(circle).toBeTruthy();
});
