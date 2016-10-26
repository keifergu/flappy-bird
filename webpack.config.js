var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path:__dirname+'/dist',
    filename: 'bundle.js',
    publicPath:'/dist',
  },
  module: {
    loaders: [
		  {
		  	test: /\.jsx?$/, 
		    exclude: /(node_modules|bower_components)/, 
		    loader: 'babel-loader', 
		    query: {
		      presets: ['es2015']
		    }
  		}
    ]
  }
}