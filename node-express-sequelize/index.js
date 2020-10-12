const sequelize = require('./db/db');
const express = require('express');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const groupRouter = require('./routes/group');

const User = require('./models/User');
const Post = require('./models/Post');
const Message = require('./models/Message');
const Group = require('./models/Group');

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/group', groupRouter);

// TODO: Relations or Associations
User.hasMany(Post, { as: 'posts', foreignKey: 'creatorId', onDelete: 'CASCADE' });
Post.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
User.belongsToMany(Group, { as: 'groups', through: 'user_group', foreignKey: 'memberId' });
Group.belongsToMany(User, { as: 'members', through: 'user_group', foreignKey: 'groupId' });

app.get('/test', async (req, res) => {
	try {
		// const posts = await User.findOne({
		// 	where   : { id: 1 },
		// 	include : [
		// 		'posts',
		// 		{
		// 			model      : Group,
		// 			as         : 'groups',
		// 			attributes : [
		// 				'name'
		// 			]
		// 		}
		// 	]
		// });
		await Group.destroy({ where: { id: 1 } });
		// res.json(posts);
		// await sequelize.drop();
		// await User.destroy({ where: { id: 3 } });
		res.json({ message: 'group deleted!' });
	} catch (error) {
		console.log(error);
	}
});
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
	try {
		await sequelize.sync();
		console.log('Connected to database!!!');
	} catch (error) {
		console.log(error);
	}
};

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Listening on port ${PORT}`);
});
