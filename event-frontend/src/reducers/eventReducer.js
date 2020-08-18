import * as constants from "../actions/constants";
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
        data: action.form,
      };
    case constants.EDIT_FORM_PENDING:
      return {
        ...state,
        status: constants.EDIT_FORM_PENDING,
      };
    case constants.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        changed: false,
        data: action.form,
        status: constants.CREATE_EVENT_SUCCESS,
      };
    case constants.CREATE_EVENT_FAILED:
      return {
        ...state,
        changed: false,
        data: action.error,
        status: constants.CREATE_EVENT_FAILED,
      };
    default:
      return state;
  }
}

export default eventFormReducer;
