'use strict';

(function (){
	class GodListController{
		constructor(){
			this.scrollContainer = '#god-list-'+this.side;
		}
		$onInit(){

		}


		sendScroll(){
			this.scroll();
		}
		chooseGod(god){
			console.log(god);
			this.onCreate(god);
		}

	}

	angular.module('smiteApp')
	.component('godList', {
    	templateUrl: 'app/components/godlist/godListTemplate.html',
    	controller: GodListController,
    	bindings: {
	        gods: '<',
	        onCreate: '&',
	        scroll: '&',
	        side: '<',
	        search: '<',
	        loadedGods: '<'
	    }
	});
}());


