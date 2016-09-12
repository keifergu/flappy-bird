var webpack = require('webpack');

module.exports = {
  entry: './entry.js',
  output: {
    path:__dirname+'/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
		  {
		  	test: /\.jsx?$/, // 匹配'js' or 'jsx' 后缀的文件类型
		    exclude: /(node_modules|bower_components)/, // 排除某些文件
		    loader: 'babel', // 使用'babel-loader'也是一样的
		    query: { // 参数
		      presets: ['es2015']
		    }
  		}
    ]
  }
}