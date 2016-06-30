/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _sqldb = require('../sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

var _sequelizeFixtures = require('sequelize-fixtures');

var _sequelizeFixtures2 = _interopRequireDefault(_sequelizeFixtures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var God = _sqldb2.default.God;
var User = _sqldb2.default.User;
var Item = _sqldb2.default.Item;
var Level = _sqldb2.default.Level;
var Ability = _sqldb2.default.Ability;
var Component = _sqldb2.default.Component;
var seedLocation = process.env.seedLocation || './seedData';

function roundToDecimal(val, places) {
	return +(Math.round(val + 'e+' + places) + 'e-' + places);
}
function compoundGrowth(base, inc, times) {
	inc += 1;
	for (var x = 1; x < times; x++) {
		base *= inc;
	}
	return roundToDecimal(base, 3);
}

function GodFactory(god, level) {
	this.level = level;
	this.name = god.name;
	this.health = god.health + level * god.health_Growth_Rate;
	this.mana = god.mana + level * god.mana_Growth_Rate;
	this.physical = god.physical + level * god.physical_Growth_Rate;
	this.magical = roundToDecimal(god.magical + level * god.magical_Growth_Rate, 2);
	this.hp5 = roundToDecimal(god.hp5 + god.hp5_Growth_Rate * level, 2);
	this.mp5 = roundToDecimal(god.mp5 + god.mp5_Growth_Rate * level, 2);
	this.range = roundToDecimal(god.range + level * god.range_Growth_Rate, 2);
	this.speed = roundToDecimal(god.speed + level * god.speed_Growth_Rate, 2);
	this.physicalprotection = roundToDecimal(god.physicalprotection + god.physicalprotection_Growth_Rate * level, 2);
	this.magicalprotection = roundToDecimal(god.magicalprotection + god.magicalprotection_Growth_Rate * level, 2);
	this.baseDamage = roundToDecimal(god.damage + level * god.damage_Growth_Rate, 2);
	this.damage_Growth_Rate_Inc = god.damage_Growth_Rate_Inc;
	this.damage_Growth_Rate_Type = god.damage_Growth_Rate_Type;
	this.damage = roundToDecimal(this.baseDamage + this.damage_Growth_Rate_Inc * (this.damage_Growth_Rate_Type === 'Magical Power' ? this.magical : this.physical), 2);
	this.attack_msec = compoundGrowth(god.attack_Sec, god.attack_Sec_Growth_Rate, level) * 1000;
	this.class = god.class;
	this.smallimg = god.smallimg;
	this.type = god.type;
}

Level.sync({ force: true }).then(function () {
	return Level.destroy({ where: {} });
});
//Levels seeded after god's are seeded below//

God.sync({ force: true }).then(function () {
	return God.destroy({ where: {} });
}).then(function () {
	return _sequelizeFixtures2.default.loadFile(seedLocation + '/gods.json', { gods: God });
}).then(function (done) {
	console.log('Gods seeded');
	return God.findAll();
}).then(function (allGods) {
	var allGodsAllLevels = [];
	allGods.forEach(function (god) {
		for (var x = 1; x <= 20; x++) {
			allGodsAllLevels.push(new GodFactory(god, x));
		}
	});
	return Level.bulkCreate(allGodsAllLevels);
}).then(function () {
	return console.log('Levels Seeded');
}).catch(function (err) {
	return console.error(err);
});

Item.sync({ force: true }).then(function () {
	return Item.destroy({ where: {} });
}).then(function () {
	return _sequelizeFixtures2.default.loadFile(seedLocation + '/itemsFinal.json', { items: Item });
}).then(function (done) {
	return console.log('Items seeded');
}).then(function () {
	return Ability.sync({ force: true });
}).then(function () {
	return Ability.destroy({ where: {} });
}).then(function () {
	return Component.sync({ force: true });
}).then(function () {
	return Component.destroy({ where: {} });
}).then(function () {
	return _sequelizeFixtures2.default.loadFile(seedLocation + '/itemTable/itemPassiveTable.json', { ability: Ability, component: Component });
}).then(function () {
	return Ability.findAll();
}).then(function (abilities) {
	var associateItemsPromise = abilities.map(function (ability) {
		return Item.findOne({ where: { name: ability.name } }).then(function (item) {
			return item.setAbility(ability);
		});
	});
	_promise2.default.all(associateItemsPromise);
}).then(function () {
	return console.log('abilities associated with items');
}).catch(function (err) {
	return console.error(err);
});

User.sync().then(function () {
	return User.destroy({ where: {} });
}).then(function () {
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
	}]).then(function () {
		console.log('finished populating users');
	});
});
//# sourceMappingURL=seed.js.map
