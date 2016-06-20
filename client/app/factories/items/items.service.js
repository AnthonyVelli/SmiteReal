'use strict';

angular.module('smiteApp')
  .factory('ItemsFact', function ($http) {
	function error (err) {
      console.error(err);
    }
    var items = [];
    // Public API here
    return {
      getAll: function () {
        return $http.get('/api/items')
        .then(foundItems => {
        	foundItems.data.forEach(item => items.push(item));
        	return items; })
        .catch(error);
      },
      getItems: function() {
      	if (!items.length) {
      		return this.getAll();
      	} else {
      		return items;
      	}
      }
    };
  });
