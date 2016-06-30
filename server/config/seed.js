/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';
 import sqldb from '../sqldb';
 import sequelize_fixtures from 'sequelize-fixtures';
 var God = sqldb.God;
 var User = sqldb.User;
 var Item = sqldb.Item;
 var Level = sqldb.Level;
 var Ability = sqldb.Ability;
 var Component = sqldb.Component;



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

function GodFactory (god, level){
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
	this.physicalprotection = roundToDecimal((god.physicalprotection + (god.physicalprotection_Growth_Rate * level)), 2);
	this.magicalprotection = roundToDecimal((god.magicalprotection + (god.magicalprotection_Growth_Rate * level)), 2);
	this.baseDamage = roundToDecimal((god.damage + (level * god.damage_Growth_Rate)), 2);
	this.damage_Growth_Rate_Inc = god.damage_Growth_Rate_Inc;
	this.damage_Growth_Rate_Type = god.damage_Growth_Rate_Type;
	this.damage = roundToDecimal(this.baseDamage + (this.damage_Growth_Rate_Inc * (this.damage_Growth_Rate_Type === 'Magical Power' ? this.magical : this.physical)), 2);
	this.attack_msec = compoundGrowth(god.attack_Sec, god.attack_Sec_Growth_Rate, level) * 1000;
	this.class = god.class;
	this.smallimg = god.smallimg;
	this.type = god.type;
}




Level.sync({force: true})
.then(() => Level.destroy({ where: {} }));
//Levels seeded after god's are seeded below//

God.sync({force: true})
.then(() => God.destroy({ where: {} }))
.then(() => sequelize_fixtures.loadFile('./seedData/gods.json', {gods: God}))
.then(done => {
	console.log('Gods seeded')
	return God.findAll(); })
.then(allGods => {
	var allGodsAllLevels = [];
	allGods.forEach(god => {
		for (var x = 1; x <=20; x++) {
			allGodsAllLevels.push(new GodFactory(god, x));
		}
	})
	return Level.bulkCreate(allGodsAllLevels); })
.then(() => console.log('Levels Seeded'))
.catch(err => console.error(err));


Item.sync({force: true})
.then(() => Item.destroy({ where: {} }))
.then(() => sequelize_fixtures.loadFile('./seedData/itemsFinal.json', {items: Item}))
.then(done => console.log('Items seeded'))
.then(() => Ability.sync({force: true}))
.then(() => Ability.destroy({ where: {} }))
.then(() => Component.sync({force: true}))
.then(() => Component.destroy({ where: {} }))
.then(() => sequelize_fixtures.loadFile('./seedData/itemTable/itemPassiveTable.json', {ability: Ability, component: Component}))
.then(() => Ability.findAll() )
.then(abilities => {
	var associateItemsPromise = abilities.map(ability => {
		return Item.findOne({where: {name: ability.name}})
		.then(item => item.setAbility(ability))
	})
	Promise.all(associateItemsPromise); })
.then(() => console.log('abilities associated with items'))
.catch((err) => console.error(err));



User.sync()
.then(() => User.destroy({ where: {} }))
.then(() => {
	User.bulkCreate([{
		provider: 'local',
		name: 'Test User',
		email: 'test@example.com',
		password: 'test'
	}, {
		provider: 'local',
		role: 'admin',
		name: 'Admin',
		email: 'admin@example.com',
		password: 'admin'
	}])
	.then(() => {
		console.log('finished populating users');
	});
});
