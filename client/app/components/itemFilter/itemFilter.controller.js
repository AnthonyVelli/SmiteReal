'use strict';
(function(){
	class ItemFilterController {
		constructor (){
		}
    	sort (element) {
    		var targetEle = element.target.parentElement;
    		if (targetEle.nodeName !== 'BUTTON'){
    			return;
    		}

    		var target = targetEle.getAttribute('data-stat');
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
