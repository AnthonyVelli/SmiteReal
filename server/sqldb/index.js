/**
 * Sequelize initialization module
 */

'use strict';
import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';
// import pg from 'pg';
// delete pg.native;
var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};
// Insert models below
db.Component = db.sequelize.import('../api/component/component.model');
db.Ability = db.sequelize.import('../api/ability/ability.model');
db.Level = db.sequelize.import('../api/level/level.model');
db.Item = db.sequelize.import('../api/item/item.model');
db.God = db.sequelize.import('../api/gods/gods.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Item.hasOne(db.Ability, {constraints: false});
db.Ability.belongsTo(db.Item, {constraints: false});
db.Ability.hasMany(db.Component, {constraints: false});
module.exports = db;
