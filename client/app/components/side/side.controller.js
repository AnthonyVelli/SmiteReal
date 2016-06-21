'use strict';

(function() {
	class SideController {

		constructor(FightFact) {
			this.side = this.side;
			this.chosenGods = this.chosenGods;
			this.godList = this.gods;
			this.godsLoaded = this.gods;
			this.open = true;
			this.search = {
				text: '', 
				order: 'name',
				filter: '',
				reverse: false,
				sortCount: 0
			};
			this.godCount = this.gods.length;
			this.loadedGods = 4;
			this.FightFact = FightFact;
		}

		filter(element, filterType) {
			this.loadedGods = 4;
			if (filterType === 'sort'){
	    		if (element === this.search.order) {
					this.search.sortCount ++;
	    			this.search.sortCount === 2 ? this.disableFilter('sort') : this.search.reverse = !this.search.reverse;
	    		} else {
	    			this.search.sortCount = 0;
	    			this.search.order = element;
	    			this.search.reverse = true;
	    		}
			} else {
				this.search.filter = element;
			}
		}
		disableFilter(filterType) {
			if (filterType === 'sort') {
				this.sortCount = 0;
				this.search.order = 'name';
				this.search.reverse = false;
			} else {
				this.search.text = '';
				this.search.filter = '';
			}
		}

    	chooseGod(god) {
    		console.log(god);
    		this.chosenGods.push(this.FightFact.createFighter(god, this.side));
    	}

    	loadGods() {
    		var toLoad = Math.min(this.loadedGods + 4, this.godCount - 1);
    		while (this.loadedGods < toLoad) {
    			// this.godsLoaded.push(this.godList[this.loadedGods]);
    			this.loadedGods++;
    		}
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
			gods: '=',
			chosenGods: '=',
			side: '@'
		}
	});
})();
