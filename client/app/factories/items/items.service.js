'use strict';

angular.module('smiteApp')
  .factory('ItemsFact', function ($http) {
	function error (err) {
      console.error(err);
    }
    var tooLate = false;
    var items = [];
    function getAll () {
    	tooLate = true;
        return $http.get('/api/items')
        .then(foundItems => {
        	foundItems.data.forEach(item => items.push(item));
        	return foundItems.data; })
        .catch(error);
      }
    // Public API here
    return {
      getItems: function() {
      	if (!tooLate) {
      		return getAll();
      	} else {
      		return items;
      	}
      }
    };
  });
