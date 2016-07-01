'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Ability', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    source: DataTypes.STRING,
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    stacks: DataTypes.STRING,
    maxStacks: DataTypes.INTEGER,
    incomplete: DataTypes.STRING
  });
};
//# sourceMappingURL=ability.model.js.map
