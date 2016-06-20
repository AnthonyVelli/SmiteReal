'use strict';
angular.module('smiteApp')
.factory('FightFact', function($interval){
	function roundToDecimal (val, places) {
		return +(Math.round(val + 'e+' + places)  + 'e-' + places);
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

	class Ability {
		constructor(ability){
			this.name = ability.name;

		}
	}

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
			this.abilities = this.SetAbility(god);
			this.magicalprotection = god.magicalprotection;
			this.physicalprotection = god.physicalprotection;
			this.magicallifesteal = 0;
			this.physicallifesteal = 0;
			this.magicalpenetration = 0;
			this.magicalpenetrationPercent = 0;
			this.magicalreduction = 0;
			this.magicalreductionPercent = 0;
			this.physicalpenetration = 0;
			this.physicalpenetrationPercent = 0;
			this.physicalreduction = 0;
			this.physicalreductionPercent = 0;
			this.equipment = [{name: 'equip 1'}, {name: 'equip 2'}, {name: 'equip 3'}, {name: 'equip 4'}, {name: 'equip 5'}];
		}

		SetAbility(ability){
			let abilityObj = {};
			abilityObj[ability.name] = new Ability(ability);
			return abilityObj;
		}

		DeEquip(index) {
			var item = this.equipment[index];
			for (var stat in item.properties) {
				this.StatDecrease(stat, item.properties[stat]);
			}
			this.SetDamage();
			this.equipment[index] = {name: 'equip '+(index+1)};
			return item;
		}
		Equip(item) {
			console.log(this);
			let equipSlot = this.equipment.findIndex(slot => /equip [0-9]/.test(slot.name));
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
		TakeDamage(attack){
			let attackReceived = attack(this);
			this.healthremaining -= attackReceived.damage;
			let pixelsLost = Math.round((attackReceived.damage/this.health) * 361);
			let HBWidthOrig = this.HBWidth;
			this.HBWidth -= pixelsLost;
			if (this.HBWidth <= 0) {
				this.HBWidth = 0;
				this.events.CancelAllIntervals();
			}
			this.healthbar.clearRect(this.HBWidth,0 ,HBWidthOrig, 36);
			
		}
		StartAttack(){
			let attackingSide = this.side === 'left' ? 'right' : 'left';
			let attackFunc = function(defender){
				let attackType = this.damage_Growth_Rate_Type === 'Physical Power' ? 'physical' : 'magical';
				let flatPenetration = this[attackType+'penetration'] > 50 ? 50 : this[attackType+'penetration'];
				let defense = (defender[attackType+'protection'] * (1-this[attackType+'reductionPercent']) - this[attackType+'reduction']) * (1-this[attackType+'penetrationPercent']) - flatPenetration;
				let dmg =  (100 * this.damage) / (defense + 100);
				let name = this.name;
				console.log(this.name+' did '+dmg+' to '+defender.name);
				return {damage: dmg, attacker: name};
			};
			attackFunc = attackFunc.bind(this);
			let attack = () => this.events.Emit('attack'+attackingSide, attackFunc);
			this.events.AddInterval($interval(attack, this.attack_msec));
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
		left.forEach(god => {
			let canvas = document.getElementById('canvas-'+god.name+'-left');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ff0000';
			ctx.fillRect(0,0, canvas.width, canvas.height);
			god.HBWidth = canvas.width;
			god.healthbar = ctx;
			god.StartAttack();
			god.StartDefense();
		});
		right.forEach(god => {
			let canvas = document.getElementById('canvas-'+god.name+'-right');
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ff0000';
			ctx.fillRect(0,0, canvas.width, canvas.height);
			god.HBWidth = canvas.width;
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

