'use strict';
(function(){
	class ItemFilterController {
		constructor (){
		}
    	sort (element) {
    		var targetEle = element.target.nodeName === 'BUTTON' ? element.target: element.target.parentElement;
			var target = element.target.dataset.stat || element.target.parentElement.getAttribute('data-stat');
    		if (!target){
    			return;
    		}
    		this.onUpdate({target: target});
    		$(targetEle).toggleClass('active-fltr');
    		$(targetEle).toggleClass('md-raised');
    	}
    	
    	clearSort () {
    		this.onDelete();
    	}
	}

	angular.module('smiteApp')
	.component('itemFilter', {
	    bindings: {
	        search: '<',
	        onUpdate: '&',
	        onDelete: '&'
	    },
	    templateUrl: 'app/components/itemFilter/itemFilter.html',
	    controller: ItemFilterController
	  });

})();
