import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import EventFormPage from './components/EventFormPage/EventFormPage';

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <EventFormPage />
    </MuiPickersUtilsProvider>
  );
}

export default App;
