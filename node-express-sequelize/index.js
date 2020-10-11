const sequelize = require('./db/db');
const express = require('express');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const User = require('./models/User');
const Post = require('./models/Post');

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.get('/test', async (req, res) => {
	try {
		const posts = await Post.findAll({
			include : [
				'creator'
			]
		});
		res.json(posts);
	} catch (error) {
		console.log(error);
	}
});
const PORT = process.env.PORT || 3000;

// TODO: Relations or Associations
User.hasMany(Post, { as: 'posts', foreignKey: 'creatorId' });
Post.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

const connectDB = async () => {
	try {
		await sequelize.sync();
		await sequelize.authenticate();
		console.log('Connected to database!!!');
	} catch (error) {
		console.log(error);
	}
};

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Listening on port ${PORT}`);
});
