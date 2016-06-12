'use strict';

angular.module('smiteApp')
  .factory('ItemsFact', function ($http) {
	function error (err) {
      console.error(err);
    }
    // Public API here
    return {
      getAll: function () {
        return $http.get('/api/items')
        .then(items => items.data)
        .catch(error);
      }
    };
  });
