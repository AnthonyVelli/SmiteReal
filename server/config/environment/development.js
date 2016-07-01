'use strict';

// Development specific configuration
// ==================================

module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://user1:user1@localhost/smite',
    options: {
      dialect: 'postgres',
      port: 5432
    }
  },

  // Seed database on startup
  seedDB: true

};
//# sourceMappingURL=development.js.map
