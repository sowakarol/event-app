import * as constants from "./constants";

export const initEventForm = (form) => ({
  type: constants.INIT_EDIT_FORM,
  form,
});

export const createEventSuccess = (form) => ({
  type: constants.CREATE_EVENT_SUCCESS,
  form,
});

export const createEventFailed = (error) => ({
  type: constants.CREATE_EVENT_FAILED,
  error,
});

export const updateEventFormField = (fieldName, fieldValue) => ({
  type: constants.UPDATE_EVENT_FORM_FIELD,
  fieldName,
  fieldValue,
});

export const saveEventForm = (form) => ({
  type: constants.SAVE_EVENT_FORM,
  form,
});

export const editFormPending = () => ({
  type: constants.EDIT_FORM_PENDING,
});
