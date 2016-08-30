/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	toAnnotate.$inject = ["$scope"];
	var to_import_1 = __webpack_require__(1);
	console.log(to_import_1["default"]);
	angular.module('test', [])
	    .controller('testCtrl', ["$scope", function ($scope) {
	}])
	    .factory('testFactory', ["$cacheFactory", function ($cacheFactory) {
	    return {};
	}])
	    .service('testNotAnnotated', function () {
	    return {};
	})
	    .directive('testDirective', ["$timeout", function ($timeout) {
	    return {
	        restrict: 'E',
	        controller: ["$scope", function ($scope) {
	        }]
	    };
	}])
	    .controller('someCtrl', someCtrl);
	function toAnnotate($scope) {
	    'ngInject';
	    console.log('hi'); // should be function body, otherwise babel remove directive prologue
	}
	var someCtrl = (function () {
	    someCtrl.$inject = ["$scope"];
	    function someCtrl($scope) {
	        this.doSomething();
	    }
	    someCtrl.prototype.doSomething = function () {
	    };
	    return someCtrl;
	}());
	console.log('after annotated function');
		

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	exports["default"] = 'babel-test';
	

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map