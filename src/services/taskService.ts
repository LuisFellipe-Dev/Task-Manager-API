import { taskRepository } from "../repositories/taskRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import type { CreateTask, Task, UpdateTask } from "../types/task.js";

export const taskService = {
    getAllTasks: async (user_Id: number): Promise<Task[]> => {
        return taskRepository.findAllTasks(user_Id);
    },
    getTaskById: async (id: number, user_Id: number): Promise<Task | null> => {
        return taskRepository.findTaskById(id, user_Id);
    },
    createTask: async (task: CreateTask, id: number): Promise<Task | null> => {
        const user = await userRepository.findUserById(id);

        if(!user){
            return null;
        }

        return taskRepository.createTask(task, id);
    },
    updateTask: async (id: number, user_Id: number, update: UpdateTask): Promise<Task | null> => {
        return taskRepository.updateTask(id, user_Id, update);
    },
    toggleTaskCompleteds: async (id: number, user_Id: number): Promise<Task | null> => {
        return taskRepository.toggleTaskCompleted(id, user_Id);
    },
    deleteTask: async (id: number, user_Id: number): Promise<boolean> => {
        return await taskRepository.deleteTask(id, user_Id);
    }
};