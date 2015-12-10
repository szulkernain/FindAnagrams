"use strict";

/*This is an angular service that makes the API GET call and returns data*/

(function(){

var ctService = function($http){
  
  var onSuccess = function(response){
    return response.data;
  };
  
  var getData = function(){
    return $http.get("http://api.gndsoft.com/anagram")
                  .then(onSuccess);
  };
  
  return {
    getData: getData
  };
  
};

var app = angular.module('app');
app.factory("ctService", ["$http", ctService]);
  
}());