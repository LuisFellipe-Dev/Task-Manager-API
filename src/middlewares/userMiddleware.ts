import type { Request, Response, NextFunction } from "express"
import type { CreateUser } from "../types/user.js";
import { create } from "node:domain";

export const userMiddleware = {
    validateId: (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                message: "Id inválido."
            })
        }

        next();
    },
    validateCreateUser: (req: Request, res: Response, next: NextFunction) => {
        const createUser: CreateUser = req.body;

        if(!createUser.name || !createUser.name.trim()){
            return res.status(400).json({message: 'O Nome do Usuário é Necessário.'})
        }
        if(!createUser.email || !createUser.email.trim()){
            return res.status(400).json({message: 'O Email do Usuário é Necessário.'})
        }
        if(!createUser.password || !createUser.password.trim()){
            return res.status(400).json({message: 'O Password do Usuário é Necessário.'})
        }

        createUser.name = createUser.name.trim();
        createUser.email = createUser.email.trim();
        createUser.password = createUser.password.trim();

        next();
    },
    authUser: (req: Request, res: Response, next: NextFunction) => {
        const user = req.body;

        if(!user.email || !user.email.trim()){
            return res.status(400).json({message: "O email é necessário para essa ação."});
        }

        if(!user.password || !user.password.trim()){
            return res.status(400).json({message: "A senha é necessária para essa ação."});
        }

        user.email = user.email.trim();
        user.password = user.password.trim();

        next();
    }
} 