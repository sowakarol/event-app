import React from 'react';
import { rtlRender } from '../test.helpers';

import App from '../App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  rtlRender(<App />, div);
});
