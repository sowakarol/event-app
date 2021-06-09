import React, { Component } from 'react';
import { AppBar, Typography } from '@material-ui/core';
import './styles.css';

export class EventFormHeader extends Component {
  render() {
    return (
      <div className="EventFormHeader">
        <AppBar position="static">
          <Typography variant="h4">Create Event</Typography>
        </AppBar>
      </div>
    );
  }
}
