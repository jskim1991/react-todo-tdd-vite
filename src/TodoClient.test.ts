import { describe, it, expect, vi } from 'vitest'
import axios, { AxiosResponse } from 'axios'
import { DefaultTodoClient } from './TodoClient.ts'

describe('TodoClient', () => {
    it('should call /api/todos', () => {
        const getSpy = vi.spyOn(axios, 'get').mockResolvedValue({
            status: 200,
            data: [],
        } as AxiosResponse)

        const client = new DefaultTodoClient()
        client.fetchAll()

        expect(getSpy).toHaveBeenCalledWith('/api/todos')
    })

    it('should return todos', async () => {
        vi.spyOn(axios, 'get').mockResolvedValue({
            status: 200,
            data: [
                {
                    id: 1,
                    description: 'Test',
                    finished: false,
                },
            ],
        } as AxiosResponse)

        const client = new DefaultTodoClient()
        const actual = await client.fetchAll()

        expect(actual.length).toBe(1)
        expect(actual[0].id).toBe(1)
        expect(actual[0].description).toBe('Test')
        expect(actual[0].finished).toBe(false)
    })
})
