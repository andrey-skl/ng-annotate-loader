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

    if (sourceMapEnabled && options.map === undefined) {
        options.map = {
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


module.exports = function(source, inputSourceMap) {
  var outputSourceMap;
  var sourceMapEnabled = this.sourceMap;
  var filename = utils.getCurrentRequest(this);
  this.cacheable && this.cacheable();

  var annotateResult = ngAnnotate(source, getOptions.call(this, sourceMapEnabled, filename));  
 
  if (sourceMapEnabled && inputSourceMap) {    
    if (annotateResult.map) {
      var annotateMap = JSON.parse(annotateResult.map);
      annotateMap.sources[0] = inputSourceMap.file;
      
      var generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(annotateMap));
      generator.applySourceMap(new SourceMapConsumer(inputSourceMap));
      
      outputSourceMap = generator.toJSON();
      outputSourceMap.sources = inputSourceMap.sources;
      outputSourceMap.file = inputSourceMap.file;
    } else {
      outputSourceMap = inputSourceMap;
    }
  }

  
  this.callback(null, annotateResult.src || source, outputSourceMap);
};