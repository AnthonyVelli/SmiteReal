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
    	console.log(scope.items);
    	scope.removeGod = clickedGodID => scope.chosen.splice(clickedGodID, 1);
    	scope.equip = item => {

    	}
    	scope.equip = item => {
    		
    	}

    }

  };

});


