'use strict';
angular.module('smiteApp')
.directive('godFilter', function(){

  return {
    restrict: 'E',
    scope: {
    	filter: '&',
        search: '=',
    },
    templateUrl: 'app/components/godFilter/godFilterTemplate.html',
    link: scope => {
    	var sortCount = 0;
    	scope.clearFilter = () => {
    		scope.search.filter = '';
    		scope.search.text = '';
    	};
    	scope.sort = (element) => {
    		var target = element.target.parentElement.getAttribute('data-stat');
    		if (target === scope.search.order) {
				sortCount ++;
    			sortCount === 2 ? scope.clearSort() : scope.search.reverse = !scope.search.reverse;
    		} else {
    			sortCount = 0;
    			scope.search.order = target;
    			scope.search.reverse = true;
    		}
    	};

    	scope.clearSort = () => {
    		sortCount = 0;
    		scope.search.order = 'name';
    		scope.search.reverse = false;

    	};
    }
  };

});


