import { Todo } from './TodoModel.ts'
import axios from 'axios'

export interface TodoClient {
    fetchAll(): Promise<Todo[]>
    create(description: string): Promise<Todo>
}

export class DefaultTodoClient implements TodoClient {
    async fetchAll(): Promise<Todo[]> {
        const { data } = await axios.get<Todo[]>('/api/todos')
        return data
    }

    async create(description: string): Promise<Todo> {
        const { data } = await axios.post<Todo>('/api/todos', {
            description,
        })

        return Promise.resolve(data)
    }
}
