var ngAnnotate = require('ng-annotate');
var utils = require('loader-utils');
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var SourceMapGenerator = require('source-map').SourceMapGenerator;

function loadPlugins(pluginNames) {
  var pluginNames = pluginNames || [];
  return pluginNames.map(function(name) {
    return require(name);
  });
}

function getOptions(sourceMapEnabled) {
    var defaults = { add: true };

    var options = this.query ? utils.parseQuery(this.query) : defaults;

    if (sourceMapEnabled && options.sourcemap === undefined) {
        var filename = utils.getCurrentRequest(this);
        options.sourcemap = {inline: false, inFile: filename, sourceRoot: filename};
    }

    if (options.plugin) {
      options.plugin = loadPlugins(options.plugin);
    }

    return options;
}

module.exports = function(source, sm) {
  var sourceMapEnabled = this.sourceMap;
  this.cacheable && this.cacheable();

  var res = ngAnnotate(source, getOptions.call(this, sourceMapEnabled));

  var mergeMap;

  if (sourceMapEnabled && sm) {
    var generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(sm));
    if (res.map) {
      generator.applySourceMap(new SourceMapConsumer(res.map), filename);
      mergeMap = generator.toString();
    } else {
      mergeMap = sm;
    }
  }

  this.callback(null, res.src || source, mergeMap);
};
