import React from 'react';

import SuccessDashboard from '../SuccessDashboard';
import { rtlRender } from '../../../../test.helpers';

test('EventFormHeader renders Create Event text', () => {
  const { getByText } = rtlRender(<SuccessDashboard onFulfillFormAgainClick={() => null} />);
  const linkElement = getByText(/Create another event/i);
  expect(linkElement).toBeInTheDocument();
});
