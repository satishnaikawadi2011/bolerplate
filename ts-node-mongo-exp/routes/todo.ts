import { Router } from 'express';
import { CreateTodo, getTodos } from '../controllers/todo';

const router = Router();

router.post('/create', CreateTodo);

router.get('/fetch', getTodos);

export default router;
