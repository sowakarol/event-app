import React from 'react';
import PropTypes from 'prop-types';

import { Backdrop, CircularProgress } from '@material-ui/core';

const LoadingSpinner = ({
  isOpen = true,
}) => (
  <Backdrop open={isOpen}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

LoadingSpinner.propTypes = {
  isOpen: PropTypes.bool,
};

export default LoadingSpinner;
