import {Router} from 'express';
import {index} from '../controllers/homeController.js';
import users from './user.routes.js';
import tasks from './task.routes.js';

const router = Router();

router.get('/', index);

router.use('/users', users);

router.use('/tasks', tasks)

export default router;