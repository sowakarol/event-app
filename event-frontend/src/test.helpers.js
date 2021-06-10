import React from 'react';
import PropTypes from 'prop-types';

import { render as rtlRender } from '@testing-library/react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function render(ui, renderOptions = {}) {
  function Wrapper({ children }) {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {children}
      </MuiPickersUtilsProvider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

export { rtlRender };

// override render method
export { render };
