'use strict';
angular.module('smiteApp')
.directive('godList', function(FightFact){
  return {
    restrict: 'E',
    scope: {
        godlist: '=',
        chosen: '=',
        side: '=',
        search: '=',
    },
    templateUrl: 'app/components/godlist/godListTemplate.html',
    link: scope => {
    	scope.addGod = god => scope.chosen.push(FightFact.createFighter(god, scope.side));
    }
  };
});


