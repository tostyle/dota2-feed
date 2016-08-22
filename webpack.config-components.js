var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './app/feedApp.js'
  ],
  output: {
     path: path.join(__dirname, 'public'),
     filename: 'redux-component.js',
     publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module:{
    loaders:[
      {
        loader: 'babel',
        test : /\.js$/,
        exclude: /node_modules/,
        include: __dirname,
        query: {
            presets: ['react', 'es2015','react-hmre']
        }
      }
    ]
  }
}
