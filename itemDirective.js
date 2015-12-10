"use strict";

/*this is a directive to display an individual item.*/

(function(){

  var itemDirective = function(){
    return {
      restrict: 'E',
      templateUrl: 'item.html'
    };
  };
  
  var app = angular.module('app');
  app.directive('itemDirective', [itemDirective]);

}());