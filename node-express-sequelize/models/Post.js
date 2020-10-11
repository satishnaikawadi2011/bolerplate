const { Sequelize } = require('sequelize');
const sequelize = require('../db/db');

const Post = sequelize.define(
	'post',
	{
		id      : { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
		title   : {
			type      : Sequelize.STRING,
			allowNull : false
		},
		content : {
			type      : Sequelize.TEXT,
			allowNull : false
		}
	},
	{
		timestamps : true,
		tableName  : 'posts'
	}
);

// User.sync({ force: true });

module.exports = Post;
