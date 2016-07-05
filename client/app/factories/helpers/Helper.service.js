'use strict';
angular.module('smiteApp')
.factory('HelperFact', function(){



	return {
		roundToDecimal: function (val, places) {
			return +(Math.round(val + 'e+' + places)  + 'e-' + places);
		},

		toFloatOne: function (a){
			return typeof a === 'string' ? parseFloat(a) : a;
		},

		toFloat: function(a, b) {
			a = this.toFloatOne(a);
			b = this.toFloatOne(b);
			return [a,b];
		},
		convertOperators: function(operatorString){
			if (operatorString === '>') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a > b ? true : false;
				};
			} else if (operatorString === '<') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a < b ? true : true;
				};
			} else if (operatorString === '=') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a === b ? true : false;
				};
			} else if (operatorString === '>=') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a >= b ? true : false;
				};
			} else if (operatorString === '<=') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a <= b ? true : false;
				};
			} else if (operatorString === '+') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a + b;
				};
			} else if (operatorString === '-') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a - b;
				};
			} else if (operatorString === '*') {
				return (a, b) => {
					[a, b] = this.toFloat(a, b);
					return a * b;
				};
			}
		}
	};
});

