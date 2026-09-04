export interface User {
    id: number
    name: string
    email: string
    password: string
}

export interface UserAuth {
    id: number
    name: string
    email: string
    password: string
}

export interface PublicUser {
    id: number
    name: string
    email: string
}

export interface CreateUser{
    name: string
    email: string
    password: string
}