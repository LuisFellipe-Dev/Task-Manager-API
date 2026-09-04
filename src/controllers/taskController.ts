import type { Request, Response } from "express";
import type { Task, CreateTask, UpdateTask } from "../types/task.js";
import { taskService } from "../services/taskService.js";

export const taskController = {
    getAllTasks: async (_req: Request, res: Response) => {
        const tasks = await taskService.getAllTasks();

        return res.status(200).json(tasks);
    },
    getTaskById: async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const task = await taskService.getTaskById(id);

        if(!task){
            return res.status(404).json({
                message: 'Task/Tarefa não encontrada.'
            })
        }

        return res.status(200).json(task);
    },
    createTask: async (req: Request, res: Response) => {
        const create: CreateTask = req.body;

        const task = await taskService.createTask(create);

        if(!task){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        return res.status(201).json(task);
    },
    uptadeTask: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const update: UpdateTask = req.body;

        const task = await taskService.updateTask(id, update);

        if(!task){
            return res.status(404).json({message: 'Task/Tarefa não encontrada.'})
        }

        return res.status(200).json(task);
    },
    toggleTaskCompleteds: async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const task = await taskService.toggleTaskCompleteds(id);

        if(!task){
            return res.status(404).json({message: 'Task/Tarefa não encontrada'})
        }

        return res.status(200).json(task);
    },
    deleteTask: async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const response = await taskService.deleteTask(id);

        if(!response){
            return res.status(404).json({message: 'Task/Tarefa não encontrada'})
        }

        return res.status(204).send();
    }
};