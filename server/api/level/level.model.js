'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

exports.default = function (sequelize, DataTypes) {
		return sequelize.define('Level', {
				_id: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
				},
				level: DataTypes.INTEGER,
				name: DataTypes.STRING,
				health: DataTypes.FLOAT,
				mana: DataTypes.FLOAT,
				physical: DataTypes.FLOAT,
				magical: DataTypes.FLOAT,
				hp5: DataTypes.FLOAT,
				mp5: DataTypes.FLOAT,
				range: DataTypes.FLOAT,
				speed: DataTypes.FLOAT,
				physicalprotection: DataTypes.FLOAT,
				magicalprotection: DataTypes.FLOAT,
				baseDamage: DataTypes.FLOAT,
				damage_Growth_Rate_Inc: DataTypes.FLOAT,
				damage_Growth_Rate_Type: DataTypes.STRING,
				damage: DataTypes.FLOAT,
				attack_msec: DataTypes.FLOAT,
				class: DataTypes.STRING,
				smallimg: DataTypes.STRING,
				type: DataTypes.STRING
		});
};
//# sourceMappingURL=level.model.js.map
