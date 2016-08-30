var path = require('path');

module.exports = {
    context: __dirname,
    entry: './file-to-annotate',
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    resolveLoader: {
        fallback: path.resolve(__dirname, '../../')
    },
    tslint: {
        configuration: {
            rules: {
                quotemark: [true, "double"]
            }
        },
    },
    resolve: {
        extensions: ['.ts'],
        root: __dirname,
    },
    module: {
        preLoaders: [
            // tslint + awesome-typescript-loader make webpack prefix file path with loader name, and it cause error when merging sourcemaps,
            // test that case
            { test: /\.ts$/, loader: 'tslint-loader', exclude: /node_modules/ },
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['loader', 'awesome-typescript-loader'],
            },
        ]
    },
    debug: true,
    devtool: 'cheap-module-source-map'
};
