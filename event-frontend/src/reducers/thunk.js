import { getEventForm } from './selectors';
import eventService from '../service/event.service';
import {
  createEventSuccess,
  createEventFailed,
  createEvent,
  initEventForm,
} from '../actions/eventActions';

export const initForm = () => (dispatch, getState) => {
  const form = getEventForm(getState());
  dispatch(initEventForm(form));
};

export const saveForm = () => (dispatch, getState) => {
  const form = getEventForm(getState());
  dispatch(createEvent(form));

  eventService
    .create(form)
    .then((response) => {
      // expect only 201 responses
      if (response.status === 201) {
        console.info('Server response', response.status, response.data);
        return dispatch(createEventSuccess(response.data));
      }
      // treat unexpected response as internal error
      console.error('Unexpected server status', response);
      dispatch(createEventFailed(['Ooops, something went wrong!']));
    })
    .catch((err) => {
      const resp = err.response;

      if (resp && resp.status && resp.data) {
        const msg = resp.data.message;
        let errorMessages = null;
        if (resp.status === 400) {
          errorMessages = msg.split(',');
          // handle parsing of express validator - TODO - move it to event-api + refactor completely
          errorMessages = errorMessages.map((el) => {
            if (el.startsWith('body[')) {
              el = el.replace(/body\[eventDate\]/g, 'Event Date Field');
              el = el.replace(/body\[email\]/g, 'Email Field');
              el = el.replace(/body\[firstName\]/g, 'First Name Field');
              el = el.replace(/body\[lastName\]/g, 'Last Name Field');
            }
            return el;
          });
        }
        return dispatch(createEventFailed(errorMessages || [msg]));
      }
    });
};
