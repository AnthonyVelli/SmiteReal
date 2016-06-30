'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
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
    pros: { type: DataTypes.STRING, get: function get() {
        return this.getDataValue('pros').split(',').map(function (prop) {
          return prop.trim();
        });
      } },
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
  }, { getterMethods: {
      properties: function properties() {
        var _this = this;

        var props = {};
        stats.forEach(function (stat) {
          return _this[stat] && (props[stat] = _this[stat]);
        });
        return props;
      }
    } });
};

var stats = ['attack_msec', 'cooldownreduction', 'criticalstrikechance', 'crowdcontrolreduction', 'health', 'hp5', 'magicallifesteal', 'magicalpenetration', 'magical', 'magicalprotection', 'mana', 'speed', 'mp5', 'physicallifesteal', 'physicalpenetration', 'physical', 'physicalprotection'];
//# sourceMappingURL=item.model.js.map
