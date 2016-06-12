'use strict';

(function() {
	class SideController {

		constructor(ItemsFact) {
			this.side = this.side;
			this.chosenGods = this.chosenGods;
			this.godlist = this.gods;
			this.open = true;
			this.search = {
				text: '', 
				order: 'name',
				filter: '',
				reverse: false
			};
			this.ItemsFact = ItemsFact;
			this.items = [];
		}
 
		$onInit(){
			this.ItemsFact.getAll()
			.then(items => items.forEach(item => this.items.push(item)));
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
