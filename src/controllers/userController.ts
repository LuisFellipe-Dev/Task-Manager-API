import type { Request, Response } from "express";
import { userService } from "../services/userService.js";
import type { CreateUser, UserAuth } from "../types/user.js";

export const userController = {
    getAllUsers: async (_req: Request, res: Response) => {
        const users = await userService.getAllUsers();

        return res.json(users);
    },
    getUserById: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user = await userService.getUserById(id);

        if(!user){
            return res.status(404).json({message: "O usuário não foi encontrado."});
        }

        return res.json(user);
    },
    getUserTasks: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const userTasks = await userService.getUserTasks(id);

        if(!userTasks){
            return res.status(404).json({message: 'Usuário não Encontrado.'})
        }

        return res.status(200).json(userTasks);
    },
    createUser: async (req: Request, res: Response) => {
        const CreateUser: CreateUser = req.body;

        const user = await userService.createUser(CreateUser);

        return res.status(201).json(user);
    },
    updateUser: async (req: Request, res: Response) => {
        const {name} = req.body;
        const id = Number(req.params.id);

        if(!name || !name.trim()){
            return res.status(400).json({message: "O nome é obrigatório."});
        }

        const user = await userService.updateUser(id, name);

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado."})
        }

        return res.status(200).json(user);
    },
    authUser: async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;

        const response = await userService.authUser(email, password);

        if(!response){
            return res.status(401).json({message: "Email ou senha inválidos."});
        }

        return res.status(200).json({response});
    },
    deleteUser: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const response = await userService.deleteUser(id);

        if(!response){
            return res.status(404).json({message: "Usuário não encontrado."})
        }

        return res.status(204).send()
    }
};