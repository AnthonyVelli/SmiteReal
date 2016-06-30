/**
 * Sequelize initialization module
 */

'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

delete _pg2.default.native;
var db = {
  Sequelize: _sequelize2.default,
  sequelize: new _sequelize2.default(_environment2.default.sequelize.uri, _environment2.default.sequelize.options)
};
// Insert models below
db.Component = db.sequelize.import('../api/component/component.model');
db.Ability = db.sequelize.import('../api/ability/ability.model');
db.Level = db.sequelize.import('../api/level/level.model');
db.Item = db.sequelize.import('../api/item/item.model');
db.God = db.sequelize.import('../api/gods/gods.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Item.hasOne(db.Ability, { constraints: false });
db.Ability.belongsTo(db.Item, { constraints: false });
db.Ability.hasMany(db.Component, { constraints: false });
module.exports = db;
//# sourceMappingURL=index.js.map
