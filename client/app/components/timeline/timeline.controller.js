'use strict';

(function() {
	class TimelineController {

		constructor() {
		}

	}

	angular.module('smiteApp')
	.component('timeline', {
	    templateUrl: 'app/components/timeline/timeline.html',
	    controller: TimelineController,
	    bindings: {
	    	events: '<'
	    }
	  });

}());
