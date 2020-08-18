import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import eventReducer from "./reducers/eventReducer";
import initialState from "./reducers/initialState";

const store = createStore(
  combineReducers({ form: eventReducer }),
  initialState,
  applyMiddleware(thunk)
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
