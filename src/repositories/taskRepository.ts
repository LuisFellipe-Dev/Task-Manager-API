import { pool } from "../database/connections.js";
import type { CreateTask, Task, UpdateTask } from "../types/task.js";

export const taskRepository = {
    findAllTasks: async (user_Id: number): Promise<Task[]> => {
        const result = await pool.query<Task>('SELECT * FROM tasks WHERE user_Id = $1', [user_Id]);
        return result.rows;
    },
    findTaskById: async (id: number, user_Id: number): Promise<Task | null> => {
        const result = await pool.query<Task>('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, user_Id]);
        return result.rows[0] ?? null;
    },
    findUserTasks: async (id: number): Promise<Task[]> => {
        const result = await pool.query<Task>('SELECT * FROM tasks WHERE user_id = $1', [id]);
        return result.rows;
    },
    createTask: async (task: CreateTask, user_Id: number): Promise<Task> => {
        const result = await pool.query<Task>
        (`INSERT INTO tasks (user_id, title, description) 
          VALUES ($1, $2, $3)
          RETURNING *`, [user_Id, task.title, task.description]);
        
        const data = result.rows[0];

        if(!data){
            throw new Error('Erro ao criar Task/Tarefa.');
        }

        return data;
    },
    updateTask: async (id: number, user_Id: number, task: UpdateTask): Promise<Task | null> => {
        const result = await pool.query<Task>
        (`UPDATE tasks
          SET title = $1, description = $2
          WHERE id = $3 AND user_id = $4
          RETURNING *`, [task.title, task.description, id, user_Id]);

        return result.rows[0] ?? null;
    },
    toggleTaskCompleted: async (id: number, user_Id: number): Promise<Task | null> => {
        const result = await pool.query<Task>
        (`UPDATE tasks
          SET completed = NOT completed
          WHERE id = $1 AND user_id = $2
          RETURNING *`, [id, user_Id]);

        return result.rows[0] ?? null;
    },
    deleteTask: async (id:number, user_Id: number): Promise<boolean> => {
        const result = await pool.query
        (`DELETE FROM tasks
          WHERE id = $1 AND user_id = $2`, [id, user_Id]);

        return (result.rowCount ?? 0) > 0;
    }
}