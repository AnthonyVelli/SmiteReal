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
		controller: ($scope, gods, FightFact, GodsFact, EEFact) => {
			var EE;
			$scope.chosenGods = {};
			$scope.chosenGods.left = [];
			$scope.chosenGods.right = [];
			$scope.fightButtonText = 'Fight!';
			$scope.pauseButtonText = null;

			$scope.gods = gods;
			$scope.createFighter = (god, side) => {
				if ($scope.chosenGods[side]) {
					$scope.chosenGods[side].push(new FightFact.createFighter(god, side));
				} else {
					$scope.chosenGods[side] = [new FightFact.createFighter(god, side)];
				}
			};

			function reset(){
				$scope.Events = [];
				EEFact.setEE();
				FightFact.setEE();
				var newLeft;
				var leftItems = $scope.chosenGods.left[0].ReturnItems();
				var rightItems = $scope.chosenGods.right[0].ReturnItems();
				GodsFact.getOne($scope.chosenGods.left[0]._id)
				.then(foundGod => newLeft = foundGod)
				.then(() => GodsFact.getOne($scope.chosenGods.right[0]._id))
				.then(foundGod => {
					$scope.chosenGods.left[0] = FightFact.createFighter(newLeft, 'left');
					leftItems.forEach(item => {
						$scope.chosenGods.left[0].Equip(item);
					});
					$scope.chosenGods.right[0] = FightFact.createFighter(foundGod, 'right');
					rightItems.forEach(item => {
						$scope.chosenGods.right[0].Equip(item);
					});
					$scope.pauseButtonText = null;
					$scope.fightButtonText = 'Fight!';
				});
			}
			
			$scope.startFight = () => {
				$scope.pauseButtonText = 'Pause!';
				if ($scope.fightButtonText === 'Fight!') {
					EE = EEFact.getEE();
					EE.fightStart = new Date().getTime();
					$scope.Events = EE.occurrences;

					$scope.chosenGods.left.forEach(god => god.StartFight());
					$scope.chosenGods.right.forEach(god => god.StartFight());
					$scope.fightButtonText = 'Reset!';
				} else {
					reset();
				}
			};

			$scope.pauseFight = () => {
				if ($scope.pauseButtonText === 'Pause!') {
					EE.Pause();
					$scope.pauseButtonText = 'Play!';
				} else {
					EE.Play();
					$scope.pauseButtonText = 'Pause!';
				}
			};
		}
	});
});
