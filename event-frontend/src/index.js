import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import eventFormReducer from './components/EventFormPage/EventForm/store/reducer';
import initialState from './components/EventFormPage/EventForm/store/initialState';

const store = createStore(
  combineReducers({ eventForm: eventFormReducer }),
  initialState,
  applyMiddleware(thunk),
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
