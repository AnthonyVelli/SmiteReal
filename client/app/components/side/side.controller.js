'use strict';

(function() {
	class SideController {

		constructor(FightFact) {
			this.side = this.side;
			this.chosenGods = [];
			this.godList = this.gods;
			this.godsLoaded = this.gods;
			this.open = true;
			this.FightFact = FightFact;
		}

    	selectGod(god) {
    		this.chosenGods.push(this.FightFact.createFighter(god, this.side));
    	}

    	deSelectGod(godID){
    		this.chosenGods.splice(godID, 1);
    	}
	}

	angular.module('smiteApp')
	.component('side', {
		templateUrl: 'app/components/side/side.html',
		controller: SideController,
		bindings: {
			gods: '<',
			side: '@'
		}
	});
})();
