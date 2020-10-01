import { Request, Response } from 'express';
import Todo from '../models/Todo';

export const CreateTodo = async (req: Request, res: Response) => {
	try {
		const { description } = req.body;
		console.log(req.body);

		let errors = {
			description: ''
		};
		if (description.trim() === '') {
			// res.status(400).json('Description must not be empty !!');
			errors.description = 'Description must not be empty !!';
		}
		Object.values(errors).forEach((val) => {
			if (val !== '') {
				res.status(400).json(errors);
			}
		});
		const todo = new Todo({ description });
		await todo.save();
		res.status(201).json({ todo });
	} catch (err) {
		console.log(err);
	}
};

export const getTodos = async (req: Request, res: Response) => {
	try {
		const todos = await Todo.find();
		res.status(200).json({ todos });
	} catch (err) {
		console.log(err);
	}
};

// export const updateTodo = async (req: Request, res: Response) => {
//     try {
//         const {id} = req.params;
//         let errors = {id:''}
//         const todo = await Todo.findOne({_id:id})
//         if(!todo){
//             errors.id = 'Cannot found todo with given id !'
//             res.status(400).json(errors)
//         }
//         todo.
//     } catch (err) {
//         console.log(err);

//     }
// }
