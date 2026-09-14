import {Router} from "express";
import { taskMiddleware } from "../middlewares/taskMiddleware.js";
import { taskController } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', authMiddleware.authUserToken, taskController.getAllTasks);
router.get('/:id', authMiddleware.authUserToken, taskMiddleware.validateId, taskController.getTaskById);
router.post('/', authMiddleware.authUserToken, taskMiddleware.validateCreateTask, taskController.createTask);
router.put('/:id', authMiddleware.authUserToken, taskMiddleware.validateId, taskMiddleware.validateUpdateTask, taskController.updateTask);
router.patch('/:id/completed', authMiddleware.authUserToken, taskMiddleware.validateId, taskController.toggleTaskCompleteds);
router.delete('/:id', authMiddleware.authUserToken, taskMiddleware.validateId, taskController.deleteTask);

export default router;