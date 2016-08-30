var path = require('path');

module.exports = {
	context: __dirname,
    entry: './file-to-annotate.js',
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
	resolveLoader: {
    	fallback: path.resolve(__dirname, '../../')
	},
    module: {
	    loaders: [
			{
				test: /\.js$/,
				loaders: ['loader', 'babel?presets[]=es2015'],
			},
    	]
	},
  	devtool: 'source-map'
}
