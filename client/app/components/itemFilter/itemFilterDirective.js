'use strict';
angular.module('smiteApp')
.directive('itemFilter', function(){

  return {
    restrict: 'E',
    scope: {
        search: '=',
    },
    templateUrl: 'app/components/itemFilter/itemFilterTemplate.html',
        link: scope => {
    	scope.sort = (element) => {
    		var targetEle = element.target.parentElement;
    		if (targetEle.nodeName !== 'BUTTON'){
    			return;
    		}
    		var target = targetEle.getAttribute('data-stat');
    		$(targetEle).toggleClass('active-fltr');
    		$(targetEle).toggleClass('md-raised');
    		var splice = scope.search.order.indexOf('!'+target);
    		if (splice !== -1) {
				scope.search.order.splice(splice, 2);
    		} else {
    			scope.search.order.splice(scope.search.order.length - 2, 0, '!'+target, '-'+target);
    		}
    	};
    	scope.clearSort = () => {
    		scope.search.order = ['name'];
    	};
    }
  };

});
