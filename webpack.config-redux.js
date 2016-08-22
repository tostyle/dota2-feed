var path = require('path')
module.exports = {
  entry: './app/store/store.js',
  output: {
     path: __dirname,
     filename: './public/redux-bundle.js'
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
