'use strict';
angular.module('smiteApp')
.factory('FightFact', function($interval){
	function roundToDecimal (val, places) {
		return +(Math.round(val + 'e+' + places)  + 'e-' + places);
	}
	function compoundGrowth (base, inc, times){
		inc+=1;
		for (var x = 1; x < times; x++){
			base *= inc;
		}
		return roundToDecimal(base, 3);
	}

	class God {
		constructor(god, level){
			this.level = level;
			this.name = god.name;
			this.health = god.health + (level * god.health_Growth_Rate);
			this.mana = god.mana + (level * god.mana_Growth_Rate);
			this.physical = god.physical + (level * god.physical_Growth_Rate);
			this.magical = roundToDecimal((god.magical + (level * god.magical_Growth_Rate)), 2);
			this.hp5 = roundToDecimal((god.hp5 + (god.hp5_Growth_Rate * level)), 2);
			this.mp5 = roundToDecimal((god.mp5 + (god.mp5_Growth_Rate * level)), 2);
			this.range = roundToDecimal((god.range + (level * god.range_Growth_Rate)), 2);
			this.speed = roundToDecimal((god.speed + (level * god.speed_Growth_Rate)), 2);
			this.baseDamage = roundToDecimal((god.damage + (level * god.damage_Growth_Rate)), 2);
			this.damage_Growth_Rate_Inc = god.damage_Growth_Rate_Inc;
			this.damage_Growth_Rate_Type = god.damage_Growth_Rate_Type;
			this.damage = this.ReturnDamage();
			this.attack_msec = compoundGrowth(god.attack_Sec, god.attack_Sec_Growth_Rate, level) * 1000;
			this.class = god.class;
			this.smallimg = god.smallimg;
			this.type = god.type;
		}

		ReturnDamage(){
			return roundToDecimal(this.baseDamage + (this.damage_Growth_Rate_Inc * (this.damage_Growth_Rate_Type === 'Magical Power' ? this.magical : this.physical)), 2);
		}
		SetDamage(){
			this.damage = this.ReturnDamage();
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
			this.class = god.class;
			this.smallimg = god.smallimg;
			this.type = god.type;
			this.health = god.health;
			this.mana = god.mana;
			this.physical = god.physical;
			this.magical = god.magical;
			this.hp5 = god.hp5;
			this.mp5 = god.mp5;
			this.range = god.range;
			this.speed = god.speed;
			this.damage = god.damage;
			this.baseDamage = god.baseDamage;
			this.damage_Growth_Rate_Inc = god.damage_Growth_Rate_Inc;
			this.damage_Growth_Rate_Type = god.damage_Growth_Rate_Type;
			this.attack_msec = god.attack_msec;
			this.side = side;
			this.health = god.health;
			this.healthremaining = god.health;
			this.cooldownreduction = 0;
			this.criticalstrikechance = 0;
			this.crowdcontrolreduction = 0;
			this.magicallifesteal = 0;
			this.magicalpenetration = 0;
			this.magicalprotection = 0;
			this.physicallifesteal = 0;
			this.physicalpenetration = 0;
			this.physicalprotection = 0;
			this.equipment = [{name: 'item slot 1'}, {name: 'item slot 2'}, {name: 'item slot 3'}, {name: 'item slot 4'}, {name: 'item slot 5'}];
		}
		DeEquip(index) {
			var item = this.equipment[index];
			for (var stat in item.properties) {
				this.StatDecrease(stat, item.properties[stat]);
			}
			this.SetDamage();
			this.equipment[index] = {name: 'item slot '+(index+1)};
		}
		Equip(item) {
			console.log(this);
			let equipSlot = this.equipment.findIndex(slot => /item slot [0-9]/.test(slot.name));
			if (equipSlot+1) {
				for (var stat in item.properties) {
					this.StatIncrease(stat, item.properties[stat]);
				}
			}
			this.SetDamage();
			this.equipment[equipSlot] = item;
		}

		StatIncrease(stat, measure){
			console.log(this[stat]+'+'+measure);
			if (stat === 'attack_msec') {
				this.attack_msec = Math.round(this.attack_msec / measure, 2);
			} else if (measure % 1) {
				this[stat] = roundToDecimal(this[stat] * measure, 2);
			} else {
				this[stat] += measure;
			}
			console.log(this[stat]);
		}

		StatDecrease(stat, measure){
			console.log(this[stat]+'-'+measure);
			if (stat === 'attack_msec') {
				this.attack_msec = Math.round(this.attack_msec * measure, 2);
			} else if (measure % 1) {
				this[stat] = roundToDecimal(this[stat] / measure, 2);
			} else {
				this[stat] -= measure;
			}
			console.log(this[stat]);
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
		
		SetDamage(){
			this.damage = roundToDecimal(this.baseDamage + (this.damage_Growth_Rate_Inc * (this.damage_Growth_Rate_Type === 'Magical Power' ? this.magical : this.physical)), 2);
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

