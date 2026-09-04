import {pool} from "../database/connections.js";
import type { CreateUser, PublicUser, UserAuth } from "../types/user.js";

export const userRepository = {
    findAllUsers: async (): Promise<PublicUser[]> => {
        const result = await pool.query<PublicUser>('SELECT id, name, email FROM users');
        return result.rows;
    },
    findUserById: async (id: number): Promise<PublicUser | null> => {
        const result = await pool.query<PublicUser>(
            'SELECT id, name, email FROM users WHERE id = $1',
             [id]);
        return result.rows[0] ?? null;
    },
    findUserByEmail: async (email: string): Promise<UserAuth | null> => {
        const result = await pool.query<UserAuth>(
            'SELECT * FROM users WHERE email = $1',
            [email]);
        return result.rows[0] ?? null;
    },
    createUser: async (CreateUser: CreateUser): Promise<PublicUser> => {
        const result = await pool.query<PublicUser>(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email`,
            [CreateUser.name, CreateUser.email, CreateUser.password]);

        const user = result.rows[0];

        if(!user){
            throw new Error("Falha ao criar usuário.")
        }

        return user;
    },
    updateUser: async (id: number, user: PublicUser): Promise<PublicUser | null> => {
        const result = await pool.query<PublicUser>(
            `UPDATE users
            SET name = $1, email = $2
            WHERE id = $3
            RETURNING id, name, email`,
            [user.name, user.email, id]);
        return result.rows[0] ?? null;
    },
    deleteUser: async (id: number): Promise<boolean> => {
        const result = await pool.query(
            `DELETE FROM users
            WHERE id = $1`,
            [id]);
        return (result.rowCount ?? 0) > 0;
    }
}