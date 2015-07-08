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

function getOptions(sourceMapEnabled, filename) {
    var options = utils.parseQuery(this.query);

    //"add" should be a default option if not overrided in query
    if (options.add === undefined) {
      options.add = true;
    }

    if (sourceMapEnabled && options.sourcemap === undefined) {
        options.sourcemap = {
          inline: false, 
          inFile: filename, 
          sourceRoot: filename
        };
    }

    if (options.plugin) {
      options.plugin = loadPlugins(options.plugin);
    }

    return options;
}

module.exports = function(source, sm) {
  var mergeMap;
  var sourceMapEnabled = this.sourceMap;
  var filename = utils.getCurrentRequest(this);
  this.cacheable && this.cacheable();

  var res = ngAnnotate(source, getOptions.call(this, sourceMapEnabled, filename));

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
