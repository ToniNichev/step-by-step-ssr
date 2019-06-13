const webpack =require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  devtool: 'eval-source-map',
  externals: [nodeExternals()],
  entry: [ 
    './ssr-server.js',
  ],
  output: {
    path: path.resolve('server-build'),
    filename: '[name]-bundle.js',
    publicPath: '/server-build/',
  },  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }                 
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),          
  ]
};