'use strict';
angular.module('smiteApp')
.directive('chosen', function(){
  return {
    restrict: 'E',
    scope: {
    	chosen: '=',
    	side: '='
    },
    templateUrl: 'app/components/chosengods/chosengodsTemplate.html',
    link: scope => {
    	scope.search = {
				text: '', 
				order: ['name'],
				reverse: false
			};
    	scope.removeGod = clickedGodID => scope.chosen.splice(clickedGodID, 1);
    	scope.equip = (god, idx, item) => {
    		var itemToSplice = scope.items.indexOf(item);
    		god.Equip(scope.items.splice(itemToSplice, 1)[0]);
    	};
    	scope.deequip = (god, item) => scope.items.push(god.DeEquip(item));
	}
  };

});
