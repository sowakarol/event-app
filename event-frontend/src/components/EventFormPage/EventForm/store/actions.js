import * as types from './types';

export const initEventForm = (form) => ({
  type: types.INIT_EDIT_FORM,
  form,
});

export const createEvent = (form) => ({
  type: types.CREATE_EVENT,
  form,
});

export const createEventSuccess = (form) => ({
  type: types.CREATE_EVENT_SUCCESS,
  form,
});

export const createEventFailed = (errors) => ({
  type: types.CREATE_EVENT_FAILED,
  errors,
});

export const updateEventFormField = (fieldName, fieldValue) => ({
  type: types.UPDATE_EVENT_FORM_FIELD,
  fieldName,
  fieldValue,
});
