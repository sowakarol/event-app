import React from 'react';

import { AppBar, Typography } from '@material-ui/core';
import './styles.css';

const EventFormHeader = () => (
  <div className="EventFormHeader">
    <AppBar position="static">
      <Typography variant="h4">Create Event</Typography>
    </AppBar>
  </div>
);

export default EventFormHeader;
