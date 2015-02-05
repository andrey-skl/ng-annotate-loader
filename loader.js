var ngAnnotate = require('ng-annotate');

module.exports = function(content) {
  var annotated =  ngAnnotate(content, {add: true});
  return annotated.src;
};
