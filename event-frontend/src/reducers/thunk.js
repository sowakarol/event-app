import { getEventForm } from "./selectors";
import eventService from "../service/event.service";
import {
  createEventSuccess,
  createEventFailed,
  editFormPending,
  initEventForm,
} from "../actions/eventActions";

export function initForm() {
  return function _initForm(dispatch, getState) {
    const form = getEventForm(getState());
    dispatch(initEventForm(form));
  };
}

export function saveForm() {
  return function _saveForm(dispatch, getState) {
    dispatch(editFormPending());
    const form = getEventForm(getState());
    eventService
      .create(form)
      .then((response) => {
        if (response.status === 201) {
          console.info("Server response", response.status, response.status);
          dispatch(createEventSuccess(form));
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(createEventFailed(err));
      });
    dispatch(createEventFailed("Unexpected error"));
  };
}
