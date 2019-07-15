const webpack =require('webpack');
const path = require('path');

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
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env' : 'production' } ),  
    new ReactLoadablePlugin({
      filename: './dist/loadable-manifest.json'
    }),            
  ]
};