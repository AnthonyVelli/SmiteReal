'use strict';

angular.module('smiteApp')
  .factory('GodsFact', function ($http) {
    
    function error (err) {
      console.error(err);
    }
    // Service logic
    // ...


    // Public API here
    return {
      getAll: function () {
        return $http.get('/api/gods')
        .then(gods => gods.data)
        .catch(error);
      }
    };
  });
