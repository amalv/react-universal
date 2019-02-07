import express from "express";
import path from "path";
import compression from "compression";
import React from "react";
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

import Layout from "./components/App";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

function htmlTemplate({ reactDom, styleTags, css }) {
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
            <script src="./app.bundle.js" type="text/babel"></script>
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

app.get("/*", (req, res) => {
  const context = {};
  const sheet = new ServerStyleSheet();

  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const generateClassName = createGenerateClassName();

  const reactDom = renderToString(
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
  );

  const css = sheetsRegistry.toString();
  const styleTags = sheet.getStyleTags();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate({ reactDom, styleTags, css }));
});

const port = 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
