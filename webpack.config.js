var path = require('path')
module.exports = {
  entry: './app/client.js',
  output: {
     path: __dirname,
     filename: './public/bundle.js'
  },
  module:{
    loaders:[
      {
        loader: 'babel',
        test : /\.js$/,
        exclude: /node_modules/,
        include: __dirname,
        query: {
            presets: ['react', 'es2015']
        }
      }
    ]
  }
}
