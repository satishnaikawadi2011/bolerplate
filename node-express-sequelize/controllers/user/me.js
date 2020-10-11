const User = require('../../models/User');

module.exports = async (req, res) => {
	const { username, userId } = req.payload;
	const user = await User.findOne({
		where   : { username },
		include : [
			'posts'
		]
	});
	// const posts = user.getPosts();
	if (!user) {
		res.status(400).json({ errors: { username: 'No user found with this username!' } });
	}
	try {
		res.json(user);
	} catch (error) {
		console.log(error);
	}
};
