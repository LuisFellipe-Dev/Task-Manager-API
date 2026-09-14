export interface Task {
    id: number
    user_id: number
    title: string
    description: string
    completed: boolean
}

export interface CreateTask {
    title: string
    description?: string
}

export interface UpdateTask {
    title: string
    description: string
}