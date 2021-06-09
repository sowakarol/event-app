import React from 'react';

import { Grid } from '@material-ui/core';

import EventForm from './EventForm/EventForm';
import EventFormHeader from './EventFormHeader/EventFormHeader';

const EventFormPage = () => (
  <>
    <EventFormHeader />
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <EventForm />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  </>
);

export default EventFormPage;
