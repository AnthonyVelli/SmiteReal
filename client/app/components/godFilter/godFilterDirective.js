'use strict';

(function() {
	class GodFilterController {
		constructor() {
			
		}
		clearFilter () {
    		this.onDelete({filterType: 'filter'});
    	}
    	sort(element) {
    		var target = element.target.parentElement.getAttribute('data-stat');
    		if (!target) {
    			return null;
    		}
    		this.onUpdate({filterType: 'sort', element: target});
    	}
    	filter(element){
    		var target = element.target.parentElement.getAttribute('data-stat');
    		if (!target) {
    			return null;
    		}
    		this.onUpdate({filterType: 'filter', element: target});
    	}
    	clearSort() {
    		this.onDelete({filterType: 'sort'});
    	}
	}

	angular.module('smiteApp')
	.component('godFilter', {
	    templateUrl: 'app/components/godFilter/godFilterTemplate.html',
	    controller: GodFilterController,
	    bindings: {
	    	onUpdate: '&',
	    	onDelete: '&',
	        search: '<',
	    }
	  });

}());


