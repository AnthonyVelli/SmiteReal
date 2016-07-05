'use strict';
(function() {
	class EquipGodController{
		constructor(ItemsFact){
			this.ItemsFact = ItemsFact;
			this.search = {text: '', order: ['name'], reverse: false};
			this.items = [];
			this.itemCount = 0;
			this.loadedItems = 5;
			this.scrollContainer = '#item-list-'+this.side;
			this.test = 5;
		}

		$onInit(){
			var itemTest = this.ItemsFact.getAll();
			if (Array.isArray(itemTest)) {
				this.items = itemTest;
				this.itemCount = itemTest.length;
			} else {
				itemTest
				.then(items => {
					this.items = items;
					this.itemCount = items.length;
				});
			}
			
		}

		onScroll(){
			if (this.x < 5){
				this.test++;
			}
			var toLoad = Math.min(this.loadedItems += 5, this.itemCount - 1);
    		this.loadeditems = toLoad;
		}

		removeGod($index) {
			this.items.push(...this.chosen[0].ReturnItems());
			this.onDelete({id: $index});
		}
		equip(god, itemClicked) {

			var itemIDXToSplice = this.items.findIndex(item => item._id === itemClicked._id);
			if (itemClicked.Ability && itemClicked.Ability.stacks==='KILL' && !itemClicked.Ability.stackCount) {
			} else {
				god.Equip(this.items.splice(itemIDXToSplice, 1)[0]);
			}
		}

		deequip(god, item) {
			this.items.push(god.DeEquip(item));
		}
		sort(target){
			var splice = this.search.order.indexOf('!'+target);
    		if (splice !== -1) {
				this.search.order.splice(splice, 2);
    		} else {
    			this.search.order.splice(this.search.order.length - 2, 0, '!'+target, '-'+target);
    		}
		}

		removeFilters(){
			this.search.text = '';
			this.search.order = ['name'];
			this.loadedItems = 5;
		}

	}

	angular.module('smiteApp')
	.component('equipGod', {
		bindings: {
			chosen: '<',
			onDelete: '&',
			side: '<'
		},
		controller: EquipGodController,
		templateUrl: 'app/components/equipGod/equipGod.html'
	});
})();
