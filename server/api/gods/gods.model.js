'use strict';

module.exports = function (sequelize, DataTypes) {
	var God = sequelize.define('God', {
		_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		summary: DataTypes.STRING,
		title: DataTypes.STRING,
		pantheon: DataTypes.STRING,
		type: { type: DataTypes.STRING, get: spaceBetweenWords },
		class: DataTypes.STRING,
		pros: { type: DataTypes.STRING, get: prosToArray },
		difficulty: DataTypes.STRING,
		release_date: DataTypes.STRING,
		favor: DataTypes.FLOAT,
		gems: DataTypes.FLOAT,
		voicelines: DataTypes.STRING,
		voice_actor: DataTypes.STRING,
		health: DataTypes.FLOAT,
		health_Growth_Rate: DataTypes.FLOAT,
		mana: DataTypes.FLOAT,
		mana_Growth_Rate: DataTypes.FLOAT,
		speed: DataTypes.FLOAT,
		speed_Growth_Rate: DataTypes.FLOAT,
		range: DataTypes.FLOAT,
		range_Growth_Rate: DataTypes.FLOAT,
		attack_Sec: DataTypes.FLOAT,
		attack_Sec_Growth_Rate: DataTypes.DECIMAL,
		damage: DataTypes.FLOAT,
		damage_Growth_Rate: DataTypes.FLOAT,
		damage_Growth_Rate_2: DataTypes.STRING,
		progression: DataTypes.STRING,
		physical: DataTypes.FLOAT,
		physical_Growth_Rate: DataTypes.FLOAT,
		magical: DataTypes.FLOAT,
		magical_Growth_Rate: DataTypes.FLOAT,
		hp5: DataTypes.FLOAT,
		hp5_Growth_Rate: DataTypes.FLOAT,
		mp5: DataTypes.FLOAT,
		mp5_Growth_Rate: DataTypes.FLOAT,
		magicalprotection: DataTypes.FLOAT,
		physicalprotection: DataTypes.FLOAT,
		magicalprotection_Growth_Rate: DataTypes.FLOAT,
		physicalprotection_Growth_Rate: DataTypes.FLOAT,
		smallimg: DataTypes.STRING
	}, {
		getterMethods: {
			damage_Growth_Rate_Type: function damage_Growth_Rate_Type() {
				return this.damage_Growth_Rate_2.split(' of ')[1];
			},
			damage_Growth_Rate_Inc: function damage_Growth_Rate_Inc() {
				return returnDecimalFLOAT(this.damage_Growth_Rate_2.split(' of ')[0]);
			}
		}
	});
	return God;
};

function returnDecimalFLOAT(field) {
	field = field.replace('%', '');
	return parseFloat(field / 100 + 1);
}

function spaceBetweenWords() {
	var type = this.getDataValue('type');
	var spaceAdded = type.replace(/([a-z])([A-Z])/, function (match, p1, p2) {
		return p1 + ' ' + p2;
	});
	return spaceAdded;
}

function prosToArray() {
	var prosArr = [];
	var pros = this.getDataValue('pros');
	var re = /\s(:?High|Medium|Great|Pusher)/;
	while (pros.split(re)[1]) {
		prosArr.push(pros.split(re)[0]);
		pros = pros.split(re)[1] + pros.split(re)[2];
	}
	prosArr.push(pros);

	return prosArr;
}
//# sourceMappingURL=gods.model.js.map
