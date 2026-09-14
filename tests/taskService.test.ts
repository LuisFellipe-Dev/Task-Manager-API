import {describe, it, expect, vi} from 'vitest';
import { taskService } from '../src/services/taskService.js';
import { taskRepository } from "../src/repositories/taskRepository.js";
import { userRepository } from '../src/repositories/userRepository.js';

vi.mock('../src/repositories/taskRepository', () => ({
    taskRepository: {
        findAllTasks: vi.fn(),
        createTask: vi.fn()
    }
}));

vi.mock('../src/repositories/userRepository.js', () => ({
    userRepository:{
        findUserById: vi.fn()
    }
}))

describe("taskService", () => {
    it("deve buscar todas as tasks", async () => {

        const tasks = [
            {
                id: 1,
                user_id: 10,
                title: "Estudar Vitest",
                description: "Aprender testes",
                completed: false
            }
        ];

        vi.mocked(taskRepository.findAllTasks).mockResolvedValue(tasks);

        const result = await taskService.getAllTasks(tasks[0].user_id);

        expect(result).toEqual(tasks);

        expect(taskRepository.findAllTasks).toHaveBeenCalledTimes(1);

        expect(taskRepository.findAllTasks).toHaveBeenCalledWith();
    });
    it("deve criar uma task", async () => {

        const user = {
            id: 1,
            name: "João",
            email: "Oliveira@email.com",
        }

        const createTask = {
            title: "Estudar Vitest",
            description: "Aprender testes"
        }

        const task = {
            id: 1,
            user_id: 1,
            title: "Estudar Vitest",
            description: "Aprender testes",
            completed: false
        };

        vi.mocked(userRepository.findUserById).mockResolvedValue(user);

        vi.mocked(taskRepository.createTask).mockResolvedValue(task);

        const result = await taskService.createTask(createTask, 1);

        expect(result).toEqual(task);

        expect(userRepository.findUserById).toHaveBeenCalledTimes(1);
        expect(userRepository.findUserById).toHaveBeenCalledWith(createTask, 1);

        expect(taskRepository.createTask).toHaveBeenCalledTimes(1);
        expect(taskRepository.createTask).toHaveBeenCalledWith(createTask);
    }),
    it("não deve criar uma task", async () => {

        const createTask = {
            title: "Estudar Vitest",
            description: "Aprender testes"
        }

        vi.mocked(userRepository.findUserById).mockResolvedValue(null);

        const result = await taskService.createTask(createTask, 1);
        
        console.log(
            userRepository.findUserById.mock.calls
        );

        expect(result).toBeNull();

        expect(userRepository.findUserById).toHaveBeenCalledTimes(1);
        expect(userRepository.findUserById).toHaveBeenCalledWith(createTask, 1);

        expect(taskRepository.createTask).not.toHaveBeenCalled();
    })
});