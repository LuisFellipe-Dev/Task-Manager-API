import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { CreateUser, PublicUser, User, UserAuth } from "../types/user.js";
import { userRepository } from "../repositories/userRepository.js";
import type { Task } from "../types/task.js";
import { taskRepository } from "../repositories/taskRepository.js";

export const userService = {
    getAllUsers: async (): Promise<PublicUser[]> => {
        return userRepository.findAllUsers();
    },
    getUserById: async (id: number): Promise<PublicUser | null> => {
        return userRepository.findUserById(id);
    },
    getUserTasks: async (id: number): Promise<Task[] | null> => {
        const user = await userRepository.findUserById(id);

        if(!user){
            return null;
        }
        
        return taskRepository.findUserTasks(id);
    },
    createUser: async (CreateUser: CreateUser): Promise<PublicUser> => {
        const hashPassword = await bcrypt.hash(CreateUser.password, 10);

        const user = {...CreateUser, password: hashPassword};

        return userRepository.createUser(user);
    },
    updateUser: async (id: number, user: PublicUser): Promise<PublicUser | null> => {
        return userRepository.updateUser(id, user);
    },
    authUser: async (email: string, password: string): Promise<string | null> => {
        const user = await userRepository.findUserByEmail(email);

        if(!user){
            return null;
        }

        const authPassword = await bcrypt.compare(password, user.password);

        if(!authPassword){
            return null;
        }

        const secret = process.env.JWT_SECRET;

        if(!secret){
            throw new Error("JWT_SECRET não configurado.")
        }

        return jwt.sign({ id: user.id }, secret, {expiresIn: "1h"});
    },
    deleteUser: async (id: number): Promise<boolean> => {
        return userRepository.deleteUser(id);
    }
}