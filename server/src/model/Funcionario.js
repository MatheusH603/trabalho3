//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./database');
// import model for FK roleID
var Role = require('./Role');

var Employee = sequelize.define('funcionario', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  endereco: Sequelize.STRING,
  telefone: Sequelize.BIGINT,
  roleId: {
    type: Sequelize.INTEGER,
    // This is a reference to another model
    references: {
      model: Role,
      key: 'id'
    }
  }
},
{
	 timestamps: false,
});

Employee.belongsTo(Role)

module.exports = Employee