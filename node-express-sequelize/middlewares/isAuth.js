const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1];
		const payload = await jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ where: { username: payload.username } });
		if (!user) {
			throw new Error('Not authenticated!');
		}
		req.payload = payload;
		next();
	} catch (error) {
		throw new Error('Not authenticated!');
		console.log(error);
	}
};
