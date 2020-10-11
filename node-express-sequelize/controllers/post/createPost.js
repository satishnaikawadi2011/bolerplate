const Post = require('../../models/Post');
const validatePost = require('../../utils/validatePost');

module.exports = async (req, res) => {
	const { userId } = req.payload;
	const { title, content } = req.body;
	const { valid, errors } = validatePost(req.body);
	if (!valid) {
		res.status(400).json({ errors });
	}
	try {
		const post = await Post.create({ title, content, creatorId: userId });
		res.json(post);
	} catch (error) {
		console.log(error);
	}
};
