'use strict';
angular.module('smiteApp')
.factory('FightFact', function($interval){
	class God {
		constructor(god, level){
			this.godbase = god;
			this.level = level;
			this.name = god.name;
			this.health = god.health + (level * god.health_Growth_Rate);
			this.mana = god.mana + (level * god.mana_Growth_Rate);
			this.physical = god.physical + (level * god.physical_Growth_Rate);
			this.magical = this.Round((god.magical + (level * god.magical_Growth_Rate)), 2);
			this.hp5 = this.CompoundGrowth(god.hp5, god.hp5_Growth_Rate, level);
			this.mp5 = + this.CompoundGrowth(god.mp5, god.mp5_Growth_Rate, level);
			this.range = this.Round((god.range + (level * god.range_Growth_Rate)), 2);
			this.speed = this.Round((god.speed + (level * god.speed_Growth_Rate)), 2);
			this.damage = this.Round((god.damage + (level * god.damage_Growth_Rate) + (god.damage_Growth_Rate_Inc * (god.damage_Growth_Rate_Type === 'Magical Power' ? this.magical : this.physical))), 2);
			this.attack_msec = this.CompoundGrowth(god.attack_Sec, god.attack_Sec_Growth_Rate, level) * 1000;
		}

		Round(val, places) {
			 return +(Math.round(val + 'e+' + places)  + 'e-' + places);
		}
		CompoundGrowth(base, inc, times){
			inc+=1;
			for (var x = 1; x < times; x++){
				base *= inc;
			}
			return this.Round(base, 3);
		}
	}

	class EventEmitter {
		constructor(){
			this.events = {
				attackleft: [],
				attackright: []
			};
			this.interval = [];
		}
		Emit(eName, arg){
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
			this.interval.forEach(e => $interval.cancel(e));
		}
		AddInterval(interval){
			this.interval.push(interval);
		}
	}

	var events = new EventEmitter();

	class FightingGod {
		constructor(god, side){
			this.events = events;
			this.name = god.name;
			this.class = god.godbase.class;
			this.smallimg = god.godbase.smallimg;
			this.type = god.godbase.type;
			this.health = god.health;
			this.mana = god.mana;
			this.physical = god.physical;
			this.magical = god.magical;
			this.hp5 = god.hp5;
			this.mp5 = god.mp5;
			this.range = god.range;
			this.speed = god.speed;
			this.damage = god.damage;
			this.attack_msec = god.attack_msec;
			this.side = side;
			this.health = god.health;
			this.healthremaining = god.health;
			this.equipment = [{name: 'item slot 1'}, {name: 'item slot 2'}, {name: 'item slot 3'}, {name: 'item slot 4'}, {name: 'item slot 5'}];
		}
		Equip(item) {
			let equipSlot = this.equipment.findIndex(slot => /item slot [0-9]/.test(slot.name));
			this.equipment[equipSlot] = item;
		}
		PercentHealthRemaining(){
			var percentRemaining = Math.round((this.healthremaining/this.health) * 100);
			return percentRemaining+'%';
		}
		TakeDamage(dmg){
			this.healthremaining -= dmg;
			let pixelsLost = Math.round((dmg/this.health) * 361);
			let HBWidthOrig = this.HBWidth;
			this.HBWidth -= pixelsLost;
			if (this.HBWidth <= 0) {
				this.HBWidth = 0;
				this.events.CancelAllIntervals();
			}
			this.healthbar.clearRect(this.HBWidth,0 ,HBWidthOrig, 36);
			
		}
		StartAttack(){
			let god = this;
			let attackingSide = this.side === 'left' ? 'right' : 'left';
			let attackMSec = this.attack_msec;
			let damage = this.damage;
			let attack = () => god.events.Emit('attack'+attackingSide, damage);
			this.events.AddInterval($interval(attack, attackMSec));
		}
		StartDefense(){
			let takeDamage = this.TakeDamage.bind(this);
			this.events.On('attack'+this.side, takeDamage);
		}
	}

	function createGod (god, level){
		return new God(god, level);
	}
	function createFighter (god, side){
		return new FightingGod(god, side);
	}
	function setHealthBar (left, right){
		var HBHeight = 36;
		var HBWidth = 361;
		left.forEach(god => {
			let canvas = document.getElementById('canvas-'+god.name+'-left');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ff0000';
			ctx.fillRect(0,0, HBWidth, HBHeight);
			god.HBWidth = HBWidth;
			god.healthbar = ctx;
			god.StartAttack();
			god.StartDefense();
		});
		right.forEach(god => {
			let canvas = document.getElementById('canvas-'+god.name+'-right');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ff0000';
			ctx.fillRect(0,0, HBWidth, HBHeight);
			god.HBWidth = HBWidth;
			god.healthbar = ctx;
			god.StartAttack();
			god.StartDefense();
		});
	}
	return {
		setHealthBar: setHealthBar,
		createGod: createGod,
		createFighter: createFighter
	};
});

