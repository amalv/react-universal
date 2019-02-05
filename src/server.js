import express from 'express';
import path from 'path';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import Layout from './components/App';


function htmlTemplate({ reactDom, styleTags }) {
  return `
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>React Universal</title>
            ${styleTags}
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

const app = express();

app.use(compression({ filter: shouldCompress }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', (req, res) => {
  const context = {};
  const sheet = new ServerStyleSheet();
  const reactDom = renderToString(
    <StaticRouter location={req.url} context={context}>
      <StyleSheetManager sheet={sheet.instance}>
        <Layout />
      </StyleSheetManager>
    </StaticRouter>,
  );

  const styleTags = sheet.getStyleTags();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate({ reactDom, styleTags }));
});

const port = 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
