import { TodoClient } from './TodoClient.ts'
import { vi } from 'vitest'

export class SpyStubTodoClient implements TodoClient {
    fetchAll = vi.fn().mockResolvedValue([])
}
