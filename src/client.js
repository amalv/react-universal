import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";

import App from "./components/App";
import defaultState from "./reducers";

// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__;

// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  defaultState,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
