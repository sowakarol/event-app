import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render as rtlRender } from '@testing-library/react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import eventFormReducer from './components/EventFormPage/EventForm/store/reducer';
import reducerInitialState from './components/EventFormPage/EventForm/store/initialState';

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(
      combineReducers({ eventForm: eventFormReducer }),
      initialState,
      applyMiddleware(thunk),
    ),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {children}
        </MuiPickersUtilsProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

export { rtlRender };

// override render method
export { render };
