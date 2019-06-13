const webpack =require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
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
      }                  
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env' : 'development' } )  
  ]
};