const webpack =require('webpack');
const path = require('path');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  mode: 'production',
  entry: [ 
    './src/index.js',
  ],
  output: {
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
            loader:MiniCssExtractPlugin.loader
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
      
      // images
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
      },
      //File loader used to load fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }         

    ],
    
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env' : 'production' } ),  
    new ReactLoadablePlugin({
      filename: './dist/loadable-manifest.json'
    }),    
    new MiniCssExtractPlugin(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[name].css",
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
      }
    )             
  ],

};