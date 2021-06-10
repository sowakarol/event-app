import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

const SuccessDashboard = ({ onFulfillFormAgainClick }) => (
  <div className="center">
    <h2>Congratulation! Event is saved</h2>
    <br />
    <Button onClick={onFulfillFormAgainClick} variant="outlined" color="primary">
      Create another event
    </Button>
  </div>
);

SuccessDashboard.propTypes = {
  onFulfillFormAgainClick: PropTypes.func.isRequired,
};

export default SuccessDashboard;
