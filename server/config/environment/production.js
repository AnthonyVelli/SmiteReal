'use strict';

// Production specific configuration
// =================================
module.exports = {
	seedDB: true,
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.PORT ||
  8080,

  sequelize: {
  	uri:  process.env.DATABASE_URL,
  	options: {
  		native: true,
  		dialect:  'postgres',
  		protocol: 'postgres',
  		port:     match[4],
  		host:     match[3],
      logging:  true //false
  }
}
};
