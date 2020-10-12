const Group = require('../../models/Group');
const User = require('../../models/User');

module.exports = async (req, res) => {
	const { userId, username } = req.payload;
	const { groupName, memberName } = req.body;
	if (groupName.trim() === '') {
		res.status(400).json({ errors: { name: 'name of group must not be empty !' } });
	}
	if (memberName.trim() === '') {
		res.status(400).json({ errors: { name: 'name of member must not be empty !' } });
	}
	try {
		const user = await User.findOne({ where: { username: memberName } });
		if (!user) {
			throw new Error('member not found!');
		}
		const group = await Group.findOne({ where: { name: groupName } });
		if (!group) {
			throw new Error('No group found!');
		}
		if (group.admin !== username) {
			throw new Error('You are not a admin');
		}
		await group.addMember(user.id);
		res.json({ message: 'member added successfully' });
	} catch (error) {
		console.log(error);
	}
};
