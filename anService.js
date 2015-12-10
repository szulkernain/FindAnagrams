"use strict";

/*this is the angular services that processes data to find the anagrams*/

(function(){
 
 var anService = function(){
  
  var anagrams = new Array();
  
  var processData = function(data){
    processWords(data.words); // find the anagrams
    sortAnagrams(); // sort the anagram array based on the number of anagrams
    
    return anagrams;
  };
  
  
  var processWords = function(words)
  {
    // this method receives the entire word array
    
    var obj = new Object();
    
    for (var i = 0; i < words.length; i++)
    {
      var tempWord = words[i].replace(/\s/g, ""); //getting rid of the whitespaces inside a word
      
      /*idea is to create a dictionary type object where it's key is
      the length of the word. The value will be an array of all the words with the same length.
      Because words with different lengths are never gonna be angrams!*/
      
      var curLength = tempWord.length;
      
      if (obj[curLength] === undefined)
      {
        obj[curLength] = new Array();
      }
      
      var storedObj = new Object();
      storedObj.word = tempWord;
      storedObj.index = i; // also storing the actual index of the word to track down the image for it later.
      
      obj[curLength].push(storedObj);
    }
    
    /*now find anagrams for each (key/value) pair only*/
    for (var key in obj)
    {
      var storedWords = obj[key];
      
      findAnagrams(storedWords);
    }
  
  };

  var findAnagrams = function(words)
  {
    for (var i = 0; i < words.length; i++)
    {
      if (words[i] !== null) // the word may have already been used as an anagram for a previous word
      {
        var anObj = new Object();
        anObj.words = new Array();
        anObj.words.push(words[i]); // add this word to the anagram array even though it might not have any anagram (will be displayed alone)
        anObj.count = 1;
        
        
        // sorting the characters in the word. so when commparing, same index mismatch will tell it's NOT an anagram
        var from = String(words[i].word).toLowerCase().trim().split('').sort();
        
        for (var j = i + 1; j < words.length; j++)
        {
          if (words[j] !== null && words[j] !== undefined) // making sure this hasn't already been picked up
          {
            var to = String(words[j].word).toLowerCase().trim().split('').sort(); // again sorting the characters in the word
            
            var isAnagram = true;
            for (var k = 0; k < from.length; k++)
            {
              if (from[k] !== to[k]) // if there's a mismatch, it's not an anagrams
              {
                isAnagram = false;
                break;
              }
            }
            
            if (isAnagram)  // all the characters matched, so add this word to the anagram array
            {
              anObj.words.push(words[j]);
              anObj.count++;
              
              words[j] = null;  // when a word is pushed to the array, make it null so that it doesn't get picked up again
            }
          }
        }
        
        anagrams.push(anObj);
        
        // when a word is processed, make it null
        words[i] = null;
      }
    }
  };

  var sortAnagrams = function()
  {
    // sorting the anagram array based on the number of words in it in ascending order
    anagrams.sort(function(a, b){
      if (a.count < b.count)
        return -1;
      if (a.count > b.count)
        return 1;
      return 0;
    });
  };
  
  return {
    processData: processData
  };
   
 };
 
 var app = angular.module('app');
 app.factory('anService', [anService]);
  
}());