// Note: this example babel and equires babel-loader
// npm install babel babel-loader

var path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');

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
