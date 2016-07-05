'use strict';
angular.module('smiteApp')
.factory('FightFact', function($interval, EEFact, HelperFact){
	const HF = HelperFact;
	var EE = EEFact.getEE();

	class Effect {
		constructor(name, effectChain, god){
			this.effectChain = effectChain;
			this.name = name;
			this.stat = effectChain.effect.stat;
			this.operator = effectChain.effect.condition;
			this.amount = null;
			this.parseEffectChain(god);
		}
		parseEffectChain(god){
			var effectChain = this.effectChain;
			if (!effectChain[effectChain.effect.amount]) {
				this.amount = HF.toFloatOne(effectChain.effect.amount);
				return;
			}
			function recurseChain (effect){
				var stat = god[effect.stat] ? god[effect.stat] : effect.stat;
				var amount = god[effect.amount] ? god[effect.amount] : effect.amount;
				if (/s[0-9]/.test(effect.stat) && /s[0-9]/.test(effect.amount)) {
					return HF.convertOperators(effect.condition)(recurseChain(effectChain[effect.stat]), recurseChain(effectChain[effect.amount]));
				} else if (/s[0-9]/.test(effect.stat)) {
					return HF.convertOperators(effect.condition)(recurseChain(effectChain[effect.stat]), amount);
				} else if (/s[0-9]/.test(effect.amount)) {
					return HF.convertOperators(effect.condition)(stat, recurseChain(effectChain[effect.amount]));
				} else {
					return HF.convertOperators(effect.condition)(stat, amount);
				}
			}
			this.amount = HF.roundToDecimal(recurseChain(effectChain[effectChain.effect.amount]), 2);
		}
	}



	class Ability {
		constructor(abilObj){
			this.owner = abilObj.owner;
			this.name = abilObj.name;
			this.activeEffects = [];
			this.ability = typeof abilObj.effectObj === 'function' ? abilObj.effectObj : this.parseAbility(abilObj.effectObj);
			this.trigger = typeof abilObj.trigger === 'function' ? abilObj.trigger : this.parseTrigger(abilObj.trigger);
			this.active = false;
			this.stacks = 0;
			this.interval = abilObj.interval;
			this.intervalFunc = null;
			this.emitName = abilObj.emitName;
		}


		addEffect(effect) {
			var effectInstance = new Effect(this.name, effect, this.owner);
			this.activeEffects.push(effectInstance);
			this.owner.RegisterEffect(effectInstance);
		}

		emitEffect(effect){
			return function(god){
				var effectInstance = new Effect(this.name, effect, god);
				this.activeEffects.push(effectInstance);
				god.RegisterEffect(effectInstance);
			}.bind(this);
		}

		destroy(){
			this.intervalFunc.destroy();
			this.activeEffects.forEach(eff => {
				EE.Emit('destroyEffect', eff);
			});
		}

		parseAbility(effectObj){
			return function(){
				this.active = true;
				effectObj.forEach(effect => {
					if (effect.effect.target === 'this' || effect.effect.target === 'allies') {
						this.addEffect(effect);
					} else {
						var boundEffect = this.emitEffect(effect);
						EE.Emit('attack'+this.owner.attackingSide, boundEffect);
					}
				});
			};
		}


		parseTrigger(triggerComp){
			switch(triggerComp.triggertype) {
				case '1':
					return () => true;
				case 'distance':
					return () => true;
				case 'event':
					return function(){
						this.active = true;
						let side = triggerComp.target === 'this' || triggerComp.target === 'allies' ? this.owner.side : this.owner.attackingSide;
						let boundAbility = this.ability.bind(this);
						EE.On(triggerComp.stat+side, boundAbility);
					};
				case 'stat':
					return function(){
						return HF.convertOperators(triggerComp.condition)(this.owner[triggerComp.stat], triggerComp.amount);
					};
				default:
					return () => false;
			}
		}

		//checks to see if ability should be activated
		checkAbility(event){
			if (!this.active && this.trigger(event)) {
				this.ability();
			}
		}

	}



	class FightingGod {
		constructor(god, side){
			this.name = god.name;
			this._id = god._id;
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
			this.attackingSide = side === 'left' ? 'right' : 'left';
			this.healthremaining = god.health;
			this.percenthealthremaining = 1.0;
			this.cooldownreduction = 0;
			this.criticalstrikechance = 0;
			this.crowdcontrolreduction = 0;
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
			this.shield = 0;
			this.fighting = false;
			this.abilities = [];
			this.equipment = [{name: 'equip 1'}, {name: 'equip 2'}, {name: 'equip 3'}, {name: 'equip 4'}, {name: 'equip 5'}];
			this.activeEffects = [];
		}

		Initialize(){
			//create auto attack ability
			let abilObj = {
				name: this.name,
				owner: this,
				effectObj: this.BasicAttack,
				trigger: () => true,
				interval: this.attack_msec,
				emitName: 'attack'+this.attackingSide
			};
			var attackingAbil = new Ability(abilObj);
			this.abilities.push(attackingAbil);

			//register ee listeners
			let receiveAttack = this.ReceiveAttack.bind(this);
			EE.On('attack'+this.side, receiveAttack);
		}

		//auto attack function.  added to abilities array & sent as argument in emit function at attack_msec interval
		BasicAttack(){
			this.active = true;
			var eeFunction = function(defender){
				defender.RunAbilities('attack');
				let attackType = this.owner.damage_Growth_Rate_Type === 'Physical Power' ? 'physical' : 'magical';
				let flatPenetration = this[attackType+'penetration'] > 50 ? 50 : this.owner[attackType+'penetration'];
				let defense = (defender[attackType+'protection'] * (1-this.owner[attackType+'reductionPercent']) - this.owner[attackType+'reduction']) * (1-this.owner[attackType+'penetrationPercent']) - flatPenetration;
				let dmg =  (100 * this.owner.damage) / (defense + 100);
				return {stat: 'healthremaining', amount: -dmg, target: defender};
			}.bind(this);
			this.intervalFunc = EE.AddInterval(this.emitName, eeFunction, this.interval);
		}

		//function run when destroyEffect is emitted.  received effect to be destroyed & pulls from gods activeEffects array.
		DestroyEffect(Effect){
			this.activeEffects.splice(this.activeEffects.findIndex(eff => eff === Effect), 1);
		}

		//function run when this god's side is attacked.  argument received should be a function.  god being attacked is passed into received function.
		ReceiveAttack(attack){
			let attackReceived = attack(this);
			let logObj = {};
			logObj.name = attackReceived.target.name;
			logObj.attack = attackReceived.stat;
			logObj.amount = attackReceived.amount;
			logObj.time = new Date().getTime();
			EE.Emit('log', logObj);
			if (attackReceived.stat === 'healthremaining'){
				this.TakeDamage(attackReceived.amount);
			} else {
				attackReceived.target[attackReceived.stat] += attackReceived.amount;
			}
			this.UpdateEffects();
		}

		//run when this god receives damage.  updates healthpercentremaining & health bar canvas.  Handles Death condition.
		TakeDamage(dmg){
			if (this.shield) {
				var dmgRemainder = dmg + this.shield;
				this.shield += dmg;
				dmg = dmgRemainder;
			}
			var HBWidthPrev = this.HBWidth;
			let pixelsLost = Math.round((dmg/this.healthremaining) * this.HBWidth);
			this.healthremaining += dmg;
			if (this.healthremaining <= 0) {
				return this.Die();
			}
			this.percenthealthremaining = HF.roundToDecimal(this.healthremaining/this.health, 2);
			this.HBWidth += pixelsLost;
			this.healthbar.clearRect(this.HBWidth,0 ,HBWidthPrev, 36);
		}


		//run to activate passive abilites.  Can be run by this gods passive abilities, and other gods abilities through an emit.
		RegisterEffect(effect){
			this[effect.stat] = HF.convertOperators(effect.operator)(this[effect.stat], effect.amount);
			this.activeEffects.push(effect);
		}


		//run on every attack of this side.  updates all effects, 
		UpdateEffects(){
			this.activeEffects.forEach(effect => {
				var oldModifier = effect.amount;
				var godWOMod = new Object(this);
				godWOMod[effect.stat] -= effect.amount;
				effect.parseEffectChain(godWOMod);
				if (effect.amount !== oldModifier){
					effect.amount -= oldModifier;
					this[effect.stat] = HF.convertOperators(effect.operator)(this[effect.stat], effect.amount);
				}
			});
		}

		//checks to see if any dormant abilities should be activated.  Run at the beginning of a fight, and when this god is attacked.  
		RunAbilities(event){
			this.abilities.forEach(ability => {
				ability.checkAbility(event);
			});
			this.SetDamage();
		}



		//creates abilities, and adds them to this god's abilities array.  
		SetAbility(item){
			let trigger = item.Ability.Components.find(comp => comp.type === 'trigger');
			let effects = item.Ability.Components.filter(comp => /effect[0-9]/.test(comp.type) );
			let sComps = item.Ability.Components.filter(comp => /s[0-9]/.test(comp.type));
			let effectChains = effects.map(component => {
				let effectObj = {};
				effectObj.effect = component;
				sComps.forEach(s => effectObj[s.type] = s);
				return effectObj;
			});
			let abilObj = {
				name: item.name,
				owner: this,
				effectObj: effectChains,
				trigger: trigger,
				emitName: 'attack'+this.attackingSide
			};

			let newAbility = new Ability(abilObj);
			this.abilities.push(newAbility);
			newAbility.checkAbility();
			this.SetDamage();
		}


		DeEquip(index) {
			var item = this.equipment[index];
			for (var stat in item.properties) {
				this.StatDecrease(stat, item.properties[stat]);
			}
			this.SetDamage();
			this.equipment[index] = {name: 'equip '+(index+1)};
			var abilityToDestroyID = this.abilities.findIndex(ability => ability.name === item.name);
			if (abilityToDestroyID !== -1) {
				let abilityToDestroy = this.abilities[abilityToDestroyID];
				abilityToDestroy.intervalFunc && EE.Destroy(abilityToDestroy.intervalFunc);
				abilityToDestroy.activeEffects.forEach(effect => {
					EE.Emit('destroyEffect', effect);
				});
				this.abilities.splice(abilityToDestroyID, 1);
			}
			return item;
		}

		ReturnItems(){
			return this.equipment.filter(item => item._id);
		}


		Equip(item) {
			if (item.Ability && item.Ability.Components) {
				// this.SetAbility(item);
			}
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
			if (stat === 'attack_msec') {
				this.attack_msec = Math.round(this.attack_msec / measure, 2);
			} else if (measure % 1) {
				this[stat] = HF.roundToDecimal(this[stat] * measure, 2);
			} else {
				this[stat] += measure;
			}
		}

		StatDecrease(stat, measure){
			if (stat === 'attack_msec') {
				this.attack_msec = Math.round(this.attack_msec * measure, 2);
			} else if (measure % 1) {
				this[stat] = HF.roundToDecimal(this[stat] / measure, 2);
			} else {
				this[stat] -= measure;
			}
		}



		Die(){
			EE.CancelAllIntervals();
			this.healthbar.clearRect(0,0 ,this.HBWidth, 36);
		}

		

		SetDamage(){
			this.damage = HF.roundToDecimal(this.baseDamage + (this.damage_Growth_Rate_Inc * (this.damage_Growth_Rate_Type === 'Magical Power' ? this.magical : this.physical)), 2);
		}

		StartFight() {
			//set up healthbar canvas
			let canvas = document.getElementById('canvas-'+this.name+'-'+this.side);
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ff0000';
			ctx.fillRect(0,0, canvas.width, canvas.height);
			this.HBWidth = canvas.width;
			this.healthbar = ctx;
			this.fighting = true;
			this.Initialize();
			this.RunAbilities();
		}
		
	}

	function createFighter (god, side){
		var newGod = new FightingGod(god, side);
		let destroyEffect = newGod.DestroyEffect.bind(newGod);
		EE.On('destroyEffect', destroyEffect);
		return newGod;
	}

	function setEE(){
		EE = EEFact.getEE();
	}

	return {
		setEE: setEE,
		createFighter: createFighter
	};
});

