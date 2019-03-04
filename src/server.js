import express from "express";
import path from "path";
import compression from "compression";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from "@material-ui/core/styles";
import cors from "cors";
import { configureStore } from "./reducers";

import Layout from "./components/App";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

function htmlTemplate({ reactDom, styleTags, css, preloadedState }) {
  return `
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>React Universal</title>
            <style id="jss-server-side">${css}</style>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
            ${styleTags}
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            "\\u003c"
          )}
        </script>
            <script src="/app.bundle.js"></script>
        </body>
        </html>
    `;
}

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

const app = express();

app.use(compression({ filter: shouldCompress }));

app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(cors());

app.get("/*", (req, res) => {
  const context = {};
  const sheet = new ServerStyleSheet();

  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const generateClassName = createGenerateClassName();

  const { store } = configureStore(req.url);
  const reactDom = renderToString(
    <Provider store={store}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <StaticRouter location={req.url} context={context}>
            <StyleSheetManager sheet={sheet.instance}>
              <Layout />
            </StyleSheetManager>
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>
    </Provider>
  );

  const css = sheetsRegistry.toString();
  const styleTags = sheet.getStyleTags();
  const preloadedState = store.getState();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate({ reactDom, styleTags, css, preloadedState }));
});

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
