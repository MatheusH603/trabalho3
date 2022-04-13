var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'crud', //database
  'root', //user
  '', //password
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;