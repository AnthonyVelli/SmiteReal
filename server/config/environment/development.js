'use strict';

// Development specific configuration
// ==================================

module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://user1:user1@localhost/smite',
    options: {
      dialect: 'postgres',
      protocol: 'postgres',
      port: 5432,
      logging: false
    }
  },

  // Seed database on startup
  seedDB: false

};
//# sourceMappingURL=development.js.map
