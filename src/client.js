import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const app = document.getElementById('app');

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <BrowserRouter>
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  </BrowserRouter>,
  app,
);
