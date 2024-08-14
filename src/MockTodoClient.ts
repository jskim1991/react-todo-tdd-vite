import { TodoClient } from './TodoClient.ts'
import { vi } from 'vitest'
import { Todo } from './TodoModel.ts'

export class MockTodoClient implements TodoClient {
    fetchAll = vi.fn().mockResolvedValue([])

    create = vi.fn().mockResolvedValue({} as Todo)
}
