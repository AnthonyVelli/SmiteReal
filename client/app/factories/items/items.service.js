'use strict';

angular.module('smiteApp')
  .factory('ItemsFact', function ($http) {
	function error (err) {
      console.error(err);
    }
    var getting = false;
    var items = [];
    function getAll () {
      	getting = true;
        return $http.get('/api/items')
        .then(foundItems => {
        	foundItems.data.forEach(item => items.push(item));
        	return items; })
        .catch(error);
      }
    // Public API here
    return {
      getItems: function() {
      	if (!getting) {
      		return getAll();
      	} else {
      		return items;
      	}
      }
    };
  });
