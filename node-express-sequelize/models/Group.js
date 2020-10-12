const { Sequelize } = require('sequelize');
const sequelize = require('../db/db');

const Group = sequelize.define(
	'group',
	{
		id    : { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
		name  : {
			type      : Sequelize.STRING,
			allowNull : false
		},
		admin : {
			type      : Sequelize.STRING,
			allowNull : false
		}
	},
	{
		timestamps : true,
		tableName  : 'groups'
	}
);

Group.sync();

module.exports = Group;
