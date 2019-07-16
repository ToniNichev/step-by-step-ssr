const path = require('path');
const webpack =require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const Loadable  = require('react-loadable/webpack');

module.exports = {
  mode: 'production',
  entry: {
    server: './ssr-server.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // SCSS
      {
        test:/\.(s*)css$/, 
        use: [
          {
            loader:ExtractCssChunks.loader,
          },  
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[folder]-[local]',
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ],
      },   

    ]
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'server-build')
  },
  
  plugins: [
    
    new webpack.DefinePlugin({ 'process.env' : 'production' } ),    
    new Loadable.ReactLoadablePlugin({
      filename: './dist/loadable-manifest.json',
    }),    
    new ExtractCssChunks(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
      },     
    ),   
    // on the server we still need one bundle
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
  })          
  ]  
}
