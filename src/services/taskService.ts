import { taskRepository } from "../repositories/taskRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import type { CreateTask, Task, UpdateTask } from "../types/task.js";

export const taskService = {
    getAllTasks: async (): Promise<Task[]> => {
        return taskRepository.findAllTasks();
    },
    getTaskById: async (id: number): Promise<Task | null> => {
        return taskRepository.findTaskById(id);
    },
    createTask: async (task: CreateTask): Promise<Task | null> => {
        const user = await userRepository.findUserById(task.user_id);

        if(!user){
            return null;
        }

        return taskRepository.createTask(task);
    },
    updateTask: async (id: number, update: UpdateTask): Promise<Task | null> => {
        return taskRepository.updateTask(id, update);
    },
    toggleTaskCompleteds: async (id: number): Promise<Task | null> => {
        const task = await taskRepository.findTaskById(id);

        if(!task){
            return null;
        }

        return taskRepository.toggleTaskCompleted(id, task);
    },
    deleteTask: async (id: number): Promise<boolean> => {
        return await taskRepository.deleteTask(id);
    }
};