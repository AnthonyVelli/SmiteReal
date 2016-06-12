'use strict';

angular.module('smiteApp')
.config(function($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html',
		resolve: {
			gods: (GodsFact, FightFact) => GodsFact.getAll()
			.then(gods => gods.map(god => FightFact.createGod(god, 20)))
		},
		controller: ($scope, gods, FightFact) => {
			$scope.gods = gods;
			$scope.chosenGodsLeft = [];
			$scope.chosenGodsRight = [];
			$scope.startFight = () => FightFact.setHealthBar($scope.chosenGodsLeft, $scope.chosenGodsRight, $scope);
		}
	});
});
