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
			{test: /\.js$/, loaders: [path.resolve(__dirname, '../../loader')]},
    	]
	}
}