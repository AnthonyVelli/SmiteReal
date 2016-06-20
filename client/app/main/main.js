'use strict';

angular.module('smiteApp')
.config(function($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html',
		resolve: {
			gods: GodsFact => GodsFact.getAll()
			.then(gods => gods)
		},
		controller: ($scope, gods, FightFact) => {
			$scope.gods = gods;
			$scope.chosenGodsLeft = [];
			$scope.chosenGodsRight = [];
			$scope.startFight = () => FightFact.setHealthBar($scope.chosenGodsLeft, $scope.chosenGodsRight, $scope);
		}
	});
});
