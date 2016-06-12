'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Item', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    class: DataTypes.STRING,
    pros: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    description: DataTypes.STRING,
    startsFrom: DataTypes.STRING,
	attack_msec: DataTypes.FLOAT,
	cooldownreduction: DataTypes.FLOAT,
	criticalstrikechance: DataTypes.FLOAT,
	crowdcontrolreduction: DataTypes.FLOAT,
	health: DataTypes.FLOAT,
	hp5: DataTypes.FLOAT,
	magicallifesteal: DataTypes.FLOAT,
	magicalpenetration: DataTypes.FLOAT,
	magical: DataTypes.FLOAT,
	magicalprotection: DataTypes.FLOAT,
	mana: DataTypes.FLOAT,
	speed: DataTypes.FLOAT,
	mp5: DataTypes.FLOAT,
	physicallifesteal: DataTypes.FLOAT,
	physicalpenetration: DataTypes.FLOAT,
	physical: DataTypes.FLOAT,
	physicalprotection: DataTypes.FLOAT
  });
}
