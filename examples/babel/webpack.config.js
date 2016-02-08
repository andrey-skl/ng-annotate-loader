// Note: this example requires babel-loader
// npm install babel-loader

var path = require('path');

module.exports = {
	context: __dirname, 
    entry: './file-to-annotate',
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    module: {
	    loaders: [
			{test: /\.js$/, loaders: [path.resolve(__dirname, '../../loader'), 'babel']}
    	]
	},
  devtool: 'source-map'
}