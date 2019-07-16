const path = require('path');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  entry: {
    server: './ssr-server.js'
  },
  target: 'node',
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
            loader:ExtractCssChunks.loader
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
              sourceMap: false
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
    
    new ExtractCssChunks(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
      },     
    ),         
  ]  
}
