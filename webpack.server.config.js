const path = require('path')

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
    ]
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'server-build')
  }
}
