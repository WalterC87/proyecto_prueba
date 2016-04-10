'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'mysql://root:angel@localhost:3306/prueba',
    options: {
      logging: false,
      storage: 'dev.mysql',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
