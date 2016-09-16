var path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

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
  plugins: [
    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    new UglifyJsPlugin({
      beautify: false,
      mangle: {screw_ie8: true},
      compress: {
        screw_ie8: true,
        warnings: false,  // don't show unreachable variables etc
      },
      comments: false,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['loader', 'awesome-typescript-loader'],
      },
    ]
  },
  debug: true,
  devtool: 'source-map'
};
