'use strict';

(function() {
	class SideController {

		constructor() {
			this.side = this.side;
			this.godList = this.gods;
			this.godsLoaded = this.gods;
		}

    	selectGod(god) {
    		this.onCreate({god: god, side: this.side});
    	}

    	deSelectGod(id){
    		this.chosenGods.splice(id, 1);
    	}
	}

	angular.module('smiteApp')
	.component('side', {
		templateUrl: 'app/components/side/side.html',
		controller: SideController,
		bindings: {
			gods: '<',
			side: '@',
			chosenGods: '<',
			onCreate: '&'
		}
	});
})();
