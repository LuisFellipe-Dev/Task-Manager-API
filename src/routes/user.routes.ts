import {Router} from 'express';
import {userController} from '../controllers/userController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/tasks', authMiddleware.authUserToken, userController.getUserTasks);
router.post('/', userMiddleware.validateCreateUser, userController.createUser);
router.post('/auth', userMiddleware.authUser, userController.authUser);

router.get('/:id', userMiddleware.validateId, userController.getUserById);
router.put('/:id', userMiddleware.validateId, userController.updateUser);
router.delete('/:id', userMiddleware.validateId, userController.deleteUser);

export default router;