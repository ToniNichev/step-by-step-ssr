const path = require('path');
const webpack =require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    new MiniCssExtractPlugin(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
      },     
    ),   
    // on the server we still need one bundle
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
  })          
  ],  
}
