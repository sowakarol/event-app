import React from "react";
import EventForm from "./components/EventForm";
import { Grid } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { EventFormHeader } from "./components/EventFromHeader/EventFormHeader";

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <EventFormHeader />
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <EventForm />
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default App;
