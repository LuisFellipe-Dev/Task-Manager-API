import {Router} from "express";
import { taskMiddleware } from "../middlewares/taskMiddleware.js";
import { taskController } from "../controllers/taskController.js";

const router = Router();

router.get('/', taskController.getAllTasks);
router.get('/:id', taskMiddleware.validateId, taskController.getTaskById);
router.post('/', taskMiddleware.validateCreateTask, taskController.createTask);
router.put('/:id', taskMiddleware.validateId, taskMiddleware.validateUpdateTask, taskController.uptadeTask);
router.patch('/:id/completed', taskMiddleware.validateId, taskController.toggleTaskCompleteds);
router.delete('/:id', taskMiddleware.validateId, taskController.deleteTask);

export default router;