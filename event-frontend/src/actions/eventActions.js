import * as constants from "../constants/constants";

export const initEventForm = (form) => ({
  type: constants.INIT_EDIT_FORM,
  form,
});

export const createEvent = (form) => ({
  type: constants.CREATE_EVENT,
  form,
});

export const createEventSuccess = (form) => ({
  type: constants.CREATE_EVENT_SUCCESS,
  form,
});

export const createEventFailed = (errors) => ({
  type: constants.CREATE_EVENT_FAILED,
  errors,
});

export const updateEventFormField = (fieldName, fieldValue) => ({
  type: constants.UPDATE_EVENT_FORM_FIELD,
  fieldName,
  fieldValue,
});
