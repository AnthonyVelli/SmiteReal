'use strict';
angular.module('smiteApp')
.directive('chosen', function(){
  return {
    restrict: 'E',
    scope: {
    	chosen: '=',
    	side: '=',
    	items: '='
    },
    templateUrl: 'app/components/chosengods/chosengodsTemplate.html',
    link: scope => {
    	scope.removeGod = clickedGodID => scope.chosen.splice(clickedGodID, 1);
   }

  };

});


