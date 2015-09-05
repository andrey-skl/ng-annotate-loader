/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _toImport = __webpack_require__(1);
	
	var _toImport2 = _interopRequireDefault(_toImport);
	
	console.log(_toImport2['default']);
	
	angular.module('test', []).controller('testCtrl', ["$scope", function ($scope) {}]).factory('testFactory', ["$cacheFactory", function ($cacheFactory) {
		return {};
	}]).service('testNotAnnotated', function () {
		return {};
	}).directive('testDirective', ["$timeout", function ($timeout) {
		return {
			restrict: 'E',
			controller: ["$scope", function controller($scope) {}]
		};
	}]);
	
	function toAnnotate($scope) {
		'ngInject';
	}
	toAnnotate.$inject = ["$scope"];
	
	console.log('after annotated function');

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = 'babel-test';
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map