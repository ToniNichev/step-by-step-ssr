import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import Html from './html.js';
import App from './src/components/App/ssr-index';
import Loadable from 'react-loadable';
import manifest from './dist/loadable-manifest.json';
import { getDataFromTree } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { renderToStringWithData } from "react-apollo"

import { getBundles } from 'react-loadable/webpack';


const PORT = 3006;
const app = express();

app.use('/server-build', express.static('./server-build'));
app.use('/dist', express.static('dist')); // to serve frontent prod static files
app.use('/favicon.ico', express.static('./src/images/favicon.ico'));

app.get('/*', (req, res) => {

  const GRAPHQL_URL = "http://localhost:4001/graphql";

  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({ uri:  GRAPHQL_URL }),
    cache: new InMemoryCache(),
    fetch: fetch
  });  

  const modules = [];
  const mainApp = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App req={req} />
    </Loadable.Capture>    
  );


  renderToStringWithData(mainApp).then( (HTML_content) => {
    console.log(HTML_content);    

    getDataFromTree(mainApp).then(() => {  
        
      // Extract CSS and JS bundles
      const bundles = getBundles(manifest, modules); 
      const cssBundles = bundles.filter(bundle => bundle && bundle.file.split('.').pop() === 'css');
      const jsBundles = bundles.filter(bundle => bundle && bundle.file.split('.').pop() === 'js');
    
      res.status(200);
      res.send(`<!doctype html>
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Server Side Rendering and Bundle Splitting</title>
        <link
        href="/dist/main.css"
        rel="stylesheet"
        as="style"
        media="screen, projection"
        type="text/css"
        charSet="UTF-8"
      />
        <!-- Page specific CSS bundle chunks -->      
        ${
          cssBundles.map( (bundle) => (`
            <link
              href="${bundle.publicPath}"
              rel="stylesheet"
              as="style"
              media="screen, projection"
              type="text/css"
              charSet="UTF-8"
            />`)).join('\n')
        }
        <!-- Page specific JS bundle chunks -->
        ${jsBundles
          .map(({ file }) => `<script src="/dist/${file}"></script>`)
          .join('\n')}
        <!-- =========================== -->
      </head>
      <body cz-shortcut-listen="true">
        <div id="root"/>
          ${HTML_content}
        </div>
        <script src="/dist/main-bundle.js"></script>
      </body>
    </html>`);
      res.end(); 
    });    



  }).catch( (error) => {
    console.log("ERROR !!!!", error);
  });
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
});