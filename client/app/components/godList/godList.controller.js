'use strict';

(function (){
	class GodListController{
		constructor(){
			this.scrollContainer = '#god-list-'+this.side;
			this.search = {
				text: '', 
				order: 'name',
				filter: '',
				reverse: false,
				sortCount: 0
			};
			this.godCount = this.gods.length;
			this.loadedGods = 4;
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

		onScroll(){
			var toLoad = Math.min(this.loadedGods + 4, this.godCount - 1);
    		while (this.loadedGods < toLoad) {
    			this.loadedGods++;
    		}
		}

		chooseGod(god){
			this.onCreate({god: god});
		}

	}

	angular.module('smiteApp')
	.component('godList', {
		templateUrl: 'app/components/godList/godList.html',
		controller: GodListController,
		bindings: {
			gods: '<',
			onCreate: '&',
			side: '<'
		}
	});
}());


