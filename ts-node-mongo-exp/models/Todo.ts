import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
	description:
		{
			type: String
		},
	completed:
		{
			type: Boolean,
			default: false
		}
});

const Todo = model('todo', TodoSchema);
export default Todo;
