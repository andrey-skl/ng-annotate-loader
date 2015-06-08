var ngAnnotate = require('ng-annotate');
var utils = require('loader-utils');
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var SourceMapGenerator = require('source-map').SourceMapGenerator;

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function getOptions(sourceMapEnabled) {
    var defaults = { add: true };

    var options = this.query ? utils.parseQuery(this.query) : defaults;

    if (sourceMapEnabled && options.sourcemap === undefined) {
        var filename = utils.getCurrentRequest(this);
        options.sourcemap = {inline: false, inFile: filename, sourceRoot: filename};
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
