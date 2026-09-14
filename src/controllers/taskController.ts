import type { Request, Response } from "express";
import type { CreateTask, UpdateTask } from "../types/task.js";
import { taskService } from "../services/taskService.js";

export const taskController = {
    getAllTasks: async (req: Request, res: Response) => {
        const user_Id = req.userId;
        const tasks = await taskService.getAllTasks(user_Id);

        return res.status(200).json(tasks);
    },
    getTaskById: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user_Id = req.userId;

        const task = await taskService.getTaskById(id, user_Id);

        if(!task){
            return res.status(404).json({
                message: 'Task/Tarefa não encontrada.'
            })
        }

        return res.status(200).json(task);
    },
    createTask: async (req: Request, res: Response) => {
        const create: CreateTask = req.body;
        const id = req.userId;

        const task = await taskService.createTask(create, id);

        if(!task){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        return res.status(201).json(task);
    },
    updateTask: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const update: UpdateTask = req.body;
        const user_Id = req.userId;

        const task = await taskService.updateTask(id, user_Id, update);

        if(!task){
            return res.status(404).json({message: 'Task/Tarefa não encontrada.'})
        }

        return res.status(200).json(task);
    },
    toggleTaskCompleteds: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user_Id = req.userId;

        const task = await taskService.toggleTaskCompleteds(id, user_Id);

        if(!task){
            return res.status(404).json({message: 'Task/Tarefa não encontrada'})
        }

        return res.status(200).json(task);
    },
    deleteTask: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user_Id = req.userId;

        const response = await taskService.deleteTask(id, user_Id);

        if(!response){
            return res.status(404).json({message: 'Task/Tarefa não encontrada'})
        }

        return res.status(204).send();
    }
};