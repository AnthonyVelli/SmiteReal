'use strict';
angular.module('smiteApp')
.directive('godList', function(FightFact, ItemsFact){
  return {
    restrict: 'E',
    scope: {
        godsall: '=',
        chosen: '=',
        side: '=',
        search: '=',
    },
    templateUrl: 'app/components/godlist/godListTemplate.html',
    link: scope => {
    	scope.loadedGods = 5;
    	scope.scrollContainer = '#god-list-'+scope.side;
    	scope.godlist = scope.godsall.slice(0,5);
    	var godCount = scope.godsall.length;
    	scope.addGod = god => {
    		ItemsFact.getItems();
    		scope.chosen.push(FightFact.createFighter(god, scope.side));
    	};
    	scope.loadGods = () => {
    		var toLoad = Math.min(scope.loadedGods + 5, godCount - 1);
    		while (scope.loadedGods < toLoad) {
    			scope.godlist.push(scope.godsall[scope.loadedGods]);
    			scope.loadedGods++;
    		}
    	};
    }
  };
});


