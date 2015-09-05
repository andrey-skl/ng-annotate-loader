'use strict';

import babelTestMsg from './to-import';
console.log(babelTestMsg);

angular.module('test', [])
	.controller('testCtrl', function($scope) {

	})
	.factory('testFactory', function($cacheFactory) {
		return {};
	})
	.service('testNotAnnotated', function() {
		return {};
	})
	.directive('testDirective', function ($timeout) {
		return {
			restrict: 'E',
			controller: function($scope) {

			}
		};
	});
  
function toAnnotate($scope) {
  'ngInject';
}

console.log('after annotated function');