const User = require('../../models/User');
const Group = require('../../models/Group');

module.exports = async (req, res) => {
	const { userId, username } = req.payload;
	const { name } = req.body;
	if (name.trim() === '') {
		res.status(400).json({ errors: { name: 'name of group must not be empty !' } });
	}
	try {
		const group = await Group.create({ name, admin: username });
		await group.addMember(userId);
		res.json(group);
	} catch (error) {
		console.log(error);
	}
};
