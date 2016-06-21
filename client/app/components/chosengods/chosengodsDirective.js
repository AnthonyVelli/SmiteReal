'use strict';
(function() {
	class ChosenController{
		constructor(ItemsFact){
			this.ItemsFact = ItemsFact;
			this.search = {text: '', order: ['name'], reverse: false};
		}
		$onInit(){
			var items = this.ItemsFact.getItems();
			console.log(items);
		}
		removeGod($event, $index) {
			console.log($index);
			console.log($event);
			this.onDelete($index);
		}
		equip(god, idx, item) {
			var itemToSplice = scope.items.indexOf(item);
			god.Equip(scope.items.splice(itemToSplice, 1)[0]);
		}

		deequip(god, item) {
			scope.items.push(god.DeEquip(item));
		}
	}

	angular.module('smiteApp')
	.component('chosen', {
		bindings: {
			chosen: '<',
			onDelete: '&'
		},
		controller: ChosenController,
		templateUrl: 'app/components/chosengods/chosengodsTemplate.html'
	});
})();
