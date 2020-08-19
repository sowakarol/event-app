import * as constants from "../constants/constants";
import initialState from "./initialState";

function eventFormReducer(state = initialState.eventForm, action) {
  switch (action.type) {
    case constants.UPDATE_EVENT_FORM_FIELD:
      const newForm = { ...state.data };
      newForm[action.fieldName] = action.fieldValue;
      return {
        ...state,
        changed: true,
        data: newForm,
      };
    case constants.INIT_EDIT_FORM:
      return {
        ...state,
        changed: false,
        saved: false,
        data: action.form,
      };
    case constants.CREATE_EVENT:
      return {
        ...state,
        status: constants.CREATE_EVENT,
        waiting: true,
      };
    case constants.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        changed: false,
        data: action.form,
        errors: null,
        saved: true,
        status: constants.CREATE_EVENT_SUCCESS,
        waiting: false,
      };
    case constants.CREATE_EVENT_FAILED:
      return {
        ...state,
        changed: false,
        errors: action.errors,
        status: constants.CREATE_EVENT_FAILED,
        waiting: false,
      };
    default:
      return state;
  }
}

export default eventFormReducer;
