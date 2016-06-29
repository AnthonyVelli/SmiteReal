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
        return $http.get('/api/levels')
        .then(gods => gods.data)
        .catch(error);
      },
      getOne: function (id) {
      	console.log(id);
        return $http.get('/api/levels/'+id)
        .then(gods => gods.data)
        .catch(error);
      }
    };
  });
