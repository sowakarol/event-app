import React from 'react';

import { Grid } from '@material-ui/core';

import EventForm from './EventForm/EventForm';
import EventFormHeader from './EventFormHeader/EventFormHeader';

const EventFormPage = () => (
  <>
    <EventFormHeader />
    <Grid container>
      <Grid item xs={5} />
      <Grid item xs={2}>
        <EventForm />
      </Grid>
      <Grid item xs={5} />
    </Grid>
  </>
);

export default EventFormPage;
