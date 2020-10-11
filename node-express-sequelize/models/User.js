const { Sequelize } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define(
	'user',
	{
		id       : { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
		username : {
			type      : Sequelize.STRING,
			allowNull : false,
			unique    : true
		},
		email    : {
			type      : Sequelize.STRING,
			allowNull : false,
			unique    : true
		},
		password : {
			type      : Sequelize.STRING,
			allowNull : false
		}
	},
	{
		timestamps : true,
		tableName  : 'users'
	}
);

// User.sync({ force: true });

module.exports = User;
