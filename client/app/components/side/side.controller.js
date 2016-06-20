'use strict';

(function() {
	class SideController {

		constructor() {
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
			this.items = [];
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
