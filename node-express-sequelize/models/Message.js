const { Sequelize } = require('sequelize');
const sequelize = require('../db/db');

const Message = sequelize.define(
	'message',
	{
		id      : { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
		content : {
			type      : Sequelize.TEXT,
			allowNull : false
		}
	},
	{
		timestamps : true,
		tableName  : 'messages'
	}
);

Message.sync();

module.exports = Message;
