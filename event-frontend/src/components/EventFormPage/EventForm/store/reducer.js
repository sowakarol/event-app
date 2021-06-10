import * as types from './types';
import initialState from './initialState';

function eventFormReducer(state = initialState.eventForm, action) {
  switch (action.type) {
    case types.UPDATE_EVENT_FORM_FIELD: {
      const newForm = { ...state.data };
      newForm[action.fieldName] = action.fieldValue;
      return {
        ...state,
        changed: true,
        data: newForm,
      };
    }
    case types.INIT_EDIT_FORM:
      return {
        ...state,
        changed: false,
        saved: false,
        data: action.form,
      };
    case types.CREATE_EVENT:
      return {
        ...state,
        status: types.CREATE_EVENT,
        waiting: true,
      };
    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        changed: false,
        data: action.form,
        errors: null,
        saved: true,
        status: types.CREATE_EVENT_SUCCESS,
        waiting: false,
      };
    case types.CREATE_EVENT_FAILED:
      return {
        ...state,
        changed: false,
        errors: action.errors,
        status: types.CREATE_EVENT_FAILED,
        waiting: false,
      };
    default:
      return state;
  }
}

export default eventFormReducer;
