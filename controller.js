"use strict";

/*This is the angular controller that uses two services.
First to get the data back after the API call
Second, to process data and find the anagrams.
Finally attaches the returned information to scope.*/

(function(){

var ctController = function($scope, ctService, anService){
  var onSuccess = function(data){
    
    var anagrams = anService.processData(data);
    
    $scope.data = data;
    $scope.anagrams = anagrams;
    
  };
  var onError = function(reason){
    $scope.error = "Couldn't fetch data!";
  };
  
  ctService.getData()
            .then(onSuccess, onError);
  
};

var app = angular.module('app');
app.controller("ctController", ["$scope", "ctService", "anService", ctController]);

  
}());

