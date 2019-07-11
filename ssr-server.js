import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import Html from './html.js';
import App from './src/components/App/ssr-index';
import Loadable from 'react-loadable';


const PORT = 3006;
const app = express();

app.use('/server-build', express.static('./server-build'));
app.use('/dist', express.static('dist')); // to serve frontent prod static files
app.use('/favicon.ico', express.static('./src/images/favicon.ico'));

app.get('/*', (req, res) => {

    const content = ReactDOMServer.renderToString(<App req={req} />);
  
    res.status(200);
    res.send(`<!doctype html>
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="dist/main.css">
      <link rel="stylesheet" type="text/css" href="dist/1.css">
      <link rel="stylesheet" type="text/css" href="dist/2.css">
      <title>TEST</title>
    </head>
    <body cz-shortcut-listen="true">
      <div id="root"/>
        ${content}
      </div>
      <script type="text/javascript" src="dist/main-bundle.js" charSet="UTF-8" /></script>
      <script type="text/javascript" src="dist/Header-bundle.js" charSet="UTF-8" /></script>
      <script type="text/javascript" src="dist/Home-bundle.js" charSet="UTF-8" /></script>
    </body>
  </html>`);
    res.end(); 
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
});