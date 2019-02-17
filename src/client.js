import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from "@material-ui/core/styles";

import { ConnectedRouter } from "connected-react-router";
import App from "./components/App";
import { configureStore } from "./reducers";

const { store, history } = configureStore();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);
