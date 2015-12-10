"use strict";

/*this is a directive that displays a row of anagrams.*/

(function(){

  var blockDirective = function(){
    return {
      restrict: 'E',
      templateUrl: 'block.html'
    };
  };
  
  var app = angular.module('app');
  app.directive('blockDirective', [blockDirective]);
  
}());