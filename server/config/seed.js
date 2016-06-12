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

Item.sync({force: true})
  .then(() => Item.destroy({ where: {} }))
  .then(() => sequelize_fixtures.loadFile('./seedData/itemsFinal.json', {items: Item}))
  .then(done => console.log('Items seeded'));

God.sync({force: true})
  .then(() => God.destroy({ where: {} }))
  .then(() => sequelize_fixtures.loadFile('./seedData/gods.json', {gods: God}))
  .then(done => console.log('Gods seeded'));


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
