import React from 'react';

import { AppBar, Typography } from '@material-ui/core';
import '../styles.css';

const EventFormHeader = () => (
  <div className="center">
    <AppBar position="static">
      <div className="EventFormHeader">
        <Typography variant="h4">Create Event</Typography>
      </div>
    </AppBar>
  </div>
);

export default EventFormHeader;
