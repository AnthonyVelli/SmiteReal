'use strict';

// Production specific configuration
// =================================

module.exports = {
  seedDB: true,
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
  seedLocation: './server/seedData',

  sequelize: {
    uri: process.env.DATABASE_URL,
    options: {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: true
      }
    }
  }
};
//# sourceMappingURL=production.js.map
