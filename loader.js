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
 
  // Merge source maps.  Using BabelJS as an example,
  //   https://github.com/babel/babel/blob/d3a73b87e9007104cb4fec343f0cfb9e1c67a4ec/packages/babel/src/transformation/file/index.js#L465
  // See also vinyl-sourcemaps-apply (used by gulp-ng-annotate) - https://github.com/floridoo/vinyl-sourcemaps-apply/blob/master/index.js
  if (sourceMapEnabled && inputSourceMap) {    
    if (annotateResult.map) {
      var annotateMap = JSON.parse(annotateResult.map);
      //Sources array should be filled somehow to work with source-map package
      annotateMap.sources[0] = filename;
      
      var generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(annotateMap));
      generator.applySourceMap(new SourceMapConsumer(inputSourceMap));
      
      outputSourceMap = generator.toJSON();
      outputSourceMap.sources = inputSourceMap.sources;
      //Should be set to avoid '../../file is not in SourceMap error https://github.com/huston007/ng-annotate-loader/pull/11'
      outputSourceMap.sourceRoot = '';
      //Copy file name from incoming file because it is empty by some unknown reaon
      outputSourceMap.file = inputSourceMap.file;
    } else {
      outputSourceMap = inputSourceMap;
    }
  }
  
  this.callback(null, annotateResult.src || source, outputSourceMap);
};