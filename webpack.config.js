
module.exports = {
	context: __dirname + '/examples', 
    entry: './file-to-annotate',
    output: {
        path: 'examples/dist',
        filename: 'build.js'
    },
	resolveLoader: {
    	fallback: __dirname
	},
    module: {
	    loaders: [
			{test: /\.js$/, loaders: ['loader']},
    	]
	}
}