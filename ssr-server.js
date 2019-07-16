import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import Html from './html.js';
import App from './src/components/App/ssr-index';
import Loadable from 'react-loadable';
import manifest from './dist/loadable-manifest.json';

import { getBundles } from 'react-loadable/webpack';


const PORT = 3006;
const app = express();

app.use('/server-build', express.static('./server-build'));
app.use('/dist', express.static('dist')); // to serve frontent prod static files
app.use('/favicon.ico', express.static('./src/images/favicon.ico'));

app.get('/*', (req, res) => {

    const modules = []  
    const content = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <App req={req} />
      </Loadable.Capture>
    );
      

      const bundles = getBundles(manifest, modules); 
  
    res.status(200);
    res.send(`<!doctype html>
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>TEST</title>
      <!-- Page specifig bundle chunks -->
      ${bundles
        .map(({ file }) => `<script src="/dist/${file}"></script>`)
        .join('\n')}
      <!-- =========================== -->
    </head>
    <body cz-shortcut-listen="true">
      <div id="root"/>
        ${content}
      </div>

      <script src="/dist/main-bundle.js"></script>
    </body>
  </html>`);
    res.end(); 
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
});