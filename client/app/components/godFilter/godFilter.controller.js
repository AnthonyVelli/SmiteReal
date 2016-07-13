'use strict';

(function() {
	class GodFilterController {
		constructor($mdMedia) {
			this.$mdMedia = $mdMedia;
			
		}

    	sort(element) {
			var target = element.target.dataset.stat || element.target.parentElement.getAttribute('data-stat');
    		if (!target) {
    			return null;
    		}
    		this.onUpdate({filterType: 'sort', element: target});
    	}
    	filter(element){
    		console.log(this.$mdMedia('gt-md'));
    		var target = element.target.dataset.stat || element.target.parentElement.getAttribute('data-stat');
    		if (!target) {
    			return null;
    		}
    		this.onUpdate({filterType: 'filter', element: target});
    	}
    	clearSort() {
    		this.onDelete({filterType: 'sort'});
    		this.onDelete({filterType: 'filter'});
    	}
	}

	angular.module('smiteApp')
	.component('godFilter', {
	    templateUrl: 'app/components/godFilter/godFilter.html',
	    controller: GodFilterController,
	    bindings: {
	    	onUpdate: '&',
	    	onDelete: '&',
	        search: '<',
	    }
	  });

}());


