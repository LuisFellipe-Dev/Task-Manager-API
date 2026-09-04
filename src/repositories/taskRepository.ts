import { pool } from "../database/connections.js";
import type { CreateTask, Task, UpdateTask } from "../types/task.js";

export const taskRepository = {
    findAllTasks: async (): Promise<Task[]> => {
        const result = await pool.query<Task>('SELECT * FROM tasks');
        return result.rows;
    },
    findTaskById: async (id: number): Promise<Task | null> => {
        const result = await pool.query<Task>('SELECT * FROM tasks WHERE id = $1', [id]);
        return result.rows[0] ?? null;
    },
    findUserTasks: async (id: number): Promise<Task[]> => {
        const result = await pool.query<Task>('SELECT * FROM tasks WHERE user_id = $1', [id]);
        return result.rows ?? null;
    },
    createTask: async (task: CreateTask): Promise<Task> => {
        const result = await pool.query<Task>
        (`INSERT INTO tasks (user_id, title, description) 
          VALUES ($1, $2, $3)
          RETURNING *`, [task.user_id, task.title, task.description]);
        
        const data = result.rows[0];

        if(!data){
            throw new Error('Erro ao criar Task/Tarefa.');
        }

        return data;
    },
    updateTask: async (id: number, task: UpdateTask): Promise<Task | null> => {
        const result = await pool.query<Task>
        (`UPDATE tasks
          SET title = $1, description = $2
          WHERE id = $3
          RETURNING *`, [task.title, task.description, id]);

        return result.rows[0] ?? null;
    },
    toggleTaskCompleted: async (id: number, task: Task): Promise<Task | null> => {
        const result = await pool.query<Task>
        (`UPDATE tasks
          SET completed = $1
          WHERE id = $2
          RETURNING *`, [!task.completed, id]);

        return result.rows[0] ?? null;
    },
    deleteTask: async (id:number): Promise<boolean> => {
        const result = await pool.query
        (`DELETE FROM tasks
          WHERE id = $1`, [id]);

        return (result.rowCount ?? 0) > 0;
    }
}