import {Router} from 'express';
import {userController} from '../controllers/userController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userMiddleware.validateId, userController.getUserById);
router.get('/:id/tasks', userMiddleware.validateId, userController.getUserTasks);
router.post('/', userMiddleware.validateCreateUser, userController.createUser);
router.post('/auth', userMiddleware.authUser, userController.authUser);
router.put('/:id', userMiddleware.validateId, userController.updateUser);
router.delete('/:id', userMiddleware.validateId, userController.deleteUser);

export default router;