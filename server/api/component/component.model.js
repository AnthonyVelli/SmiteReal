'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Component', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    triggertype: DataTypes.STRING,
    target: DataTypes.STRING,
    stat: DataTypes.STRING,
    condition: DataTypes.STRING,
    amount: DataTypes.STRING
  });
}
