import type { Request, Response, NextFunction } from "express";
import type { CreateTask, UpdateTask } from "../types/task.js";

export const taskMiddleware = {
    validateId: (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                message: "Id inválido."
            })
        }

        next();
    },
    validateCreateTask: (req: Request, res: Response, next: NextFunction) => {
        const task: CreateTask = req.body;
        const user_id = Number(task.user_id);

        if(!Number.isInteger(user_id) || user_id <= 0){
            return res.status(400).json({
                message: "Id do Usuário Inválido."
            })
        }

        if(!task.title || !task.title.trim()){
            return res.status(400).json({
                message: "O Título da Task/Tarefa é Obrigatório."
            })
        }else if(task.title.trim().length > 255){
            return res.status(400).json({
                message: "O Título da Task/Tarefa Excede o Limite de Caracteres."
            })
        }

        if(task.description){
            if(task.description.trim().length > 1000){
                return res.status(400).json({
                    message: "A Descrição da Task/Tarefa Excede o Limite de Caracteres."
                })
            }
        }

        task.user_id = Number(task.user_id);

        task.title = task.title.trim();

        if(task.description !== undefined){
            task.description = task.description.trim();
        }else{
            task.description = "";
        }

        next();
    },
    validateUpdateTask: (req: Request, res: Response, next: NextFunction) => {
        const task: UpdateTask = req.body;

        if(!task.title || !task.title.trim()){
            return res.status(400).json({
                message: "O Título da Task/Tarefa é Obrigatório."
            });
        }
        
        if(task.title.trim().length > 255){
            return res.status(400).json(
                {message: 'O Título da Task/Tarefa Excede o Limite de Caracteres.'}
            );
        }

        task.title = task.title.trim();

        if(!task.description || !task.description.trim()){
            task.description = "";
        }else {
            if(task.description.trim().length > 1000){
                return res.status(400).json({message: 'A Descrição Excede o Limite de Caracteres.'})
            }

            task.description = task.description.trim();
        }

        next();
    }
}