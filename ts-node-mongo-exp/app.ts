import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
dotenv.config();
import TodoRouter from './routes/todo';

const app = express();

app.use(express.json());

app.use('/todo', TodoRouter);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);
	try {
		await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log(`Connected to mongodb !!`);
	} catch (err) {
		console.log(err);
	}
});
