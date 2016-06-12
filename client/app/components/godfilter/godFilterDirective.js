'use strict';
angular.module('smiteApp')
.directive('godFilter', function(){

  return {
    restrict: 'E',
    scope: {
    	filter: '&',
        search: '=',
    },
    templateUrl: 'app/components/godfilter/godFilterTemplate.html',
    link: scope => {
    	var sortCount = 1;
    	scope.clearFilter = () => {
    		scope.search.filter = '';
    		scope.search.text = '';
    	};
    	scope.sort = (element) => {
    		var target = element.target.parentElement.getAttribute('data-stat');
    		if (target === scope.search.order) {
    			scope.search.reverse = !scope.search.reverse;
				sortCount ++;
    			if (sortCount === 3){
    				scope.search.order = 'name';
    				sortCount = 1;
    				scope.search.reverse = false;
    			}
    		} else {
    			sortCount = 1;
    			scope.search.order = target;
    			scope.search.reverse = true;
    		}
    	};
    }
  };

});


