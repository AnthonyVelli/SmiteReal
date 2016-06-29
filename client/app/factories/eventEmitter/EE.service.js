'use strict';
angular.module('smiteApp')
.factory('EEFact', function($interval, $timeout){

	

	class IntervalObj{
		constructor(name, intArg, interval, EE){
			this.intArg = intArg;
			this.intName = name;
			this.interval = interval;
			this.startedAt = new Date().getTime();
			this.emitFunc = () => {
				EE.events[name].forEach(func=> func(intArg));
			};
			this.intFunc = $interval(this.emitFunc, this.interval);
			this.paused = false;
			this.pausedAt = null;
			this.remainderInterval = null;
		}

		pauseInterval(){
			this.paused = true;
			this.pausedAt = new Date().getTime();
			if (this.remainderInterval) {
				$timeout.cancel(this.remainderInterval);
				this.remainderInterval = null;
			}

			this.cancelInterval();
		}

		restartInterval(){
			this.paused = false;
			var remainderInterval = (this.pausedAt - this.startedAt) % this.interval;
			var restartInterval = function(){
				this.emitFunc();
				this.startedAt = new Date().getTime();
				this.intFunc = $interval(this.emitFunc, this.interval);
			}.bind(this);
			this.remainderInterval = $timeout(restartInterval, remainderInterval);
		}

		cancelInterval(){
			$interval.cancel(this.intFunc);
		}
	}

	class EE {
		constructor(){
			this.occurrences = [];
			this.events = {
				attackleft: [],
				attackright: [],
				log: [(arg) => {
					arg.sinceFightStart = (arg.time - this.fightStart - this.stoppageTime) / 1000;
					this.occurrences.push(arg);
				}]
			};
			this.intervals = [];
			this.fightStart = null;
			this.pausedAt = null;
			this.stoppageTime = 0;
		}

		Emit(eName, arg){
			console.log(this);
			this.events[eName].forEach(func => func(arg));
		}

		On(eName, func){
			if (this.events[eName]) {
				this.events[eName].push(func);
			} else {
				this.events[eName] = [func];
			}
		}

		CancelAllIntervals(){
			this.intervals.forEach(interval => interval.cancelInterval());
		}
		// UnbindEvents(){
		// 	for (var x in this.events){
		// 		this.events[x].forEach(event => {

		// 		});
		// 	}
		// }

		AddInterval(emitName, func, interval){
			let intervalInst = new IntervalObj(emitName, func, interval, this);
			this.intervals.push(intervalInst);
			return intervalInst;
		}
		Pause(){
			this.pausedAt = new Date().getTime();
			this.intervals.forEach(interval => interval.pauseInterval());
		}
		Play(){
			this.stoppageTime += new Date().getTime() - this.pausedAt;
			this.intervals.forEach(interval => interval.restartInterval());
		}		
		Destroy(interval){
			interval.cancelInterval();
			this.splice(this.intervals.findIndex(int => int === interval), 1);
		}
		SetStart(){
			 this.fightStart = new Date().getTime();
		}
	}

	var EEObj = new EE();


	return {
		getEE: function(){
			return EEObj;
		},
		setEE: function(){
			EEObj.CancelAllIntervals();
			// EEObj.UnbindEvents();
			EEObj = new EE();
			console.log(EEObj);
			return EEObj;
		}
	};
});

