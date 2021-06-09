import React from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';

const LoadingSpinner = ({
  isOpen = false,
}) =>  (
  <Backdrop open={isOpen}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default LoadingSpinner;