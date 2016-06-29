'use strict';

angular.module('smiteApp')
  .factory('ItemsFact', function ($http) {
	function error (err) {
      console.error(err);
    }
    var tooLate = false;
    var items = [];
    function getItem () {
    	tooLate = true;
        return $http.get('/api/items')
        .then(foundItems => {
        	foundItems.data.forEach(item => items.push(item));
        	return foundItems.data; })
        .catch(error);
      }
    // Public API here
    return {
      getAll: function() {
      	if (!tooLate) {
      		return getItem();
      	} else {
      		return items;
      	}
      },
      getOne: id => $http.get('/api/items/'+id)
      .then(item => item.data)
      .catch(error)
    };
  });
