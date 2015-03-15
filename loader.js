var ngAnnotate = require('ng-annotate');
var utils = require('loader-utils');
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var SourceMapGenerator = require('source-map').SourceMapGenerator;

module.exports = function(source, sm) {
  this.cacheable && this.cacheable();
  var filename = utils.getCurrentRequest(this);

  var res = ngAnnotate(source, {
      add: true,
      sourcemap: {inline: false, inFile: filename, sourceRoot: filename}
    }
  );

  var mergeMap;
  if (sm) {
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
