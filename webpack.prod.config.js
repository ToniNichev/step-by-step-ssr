const webpack =require('webpack');
const path = require('path');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  mode: 'production',
  entry: [ 
    './src/index.js',
  ],
  output: {
    path: path.resolve('dist'),
    filename: '[name]-bundle.js',
    publicPath: '/dist/',
  }, 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
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

    ],
    
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env' : 'production' } ),  
    new ReactLoadablePlugin({
      filename: './dist/loadable-manifest.json'
    }),    
    new ExtractCssChunks(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
      }
    )             
  ]
};