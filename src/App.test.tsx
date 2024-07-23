import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App.tsx'
import { TodoClient } from './TodoClient.ts'
import { SpyStubTodoClient } from './SpyStubTodoClient.ts'

describe('App Tests', () => {
    it('should render title', async () => {
        renderApp()

        expect(await screen.findByText('Todo App')).toBeInTheDocument()
    })

    it('should call todo client to fetch todos', async () => {
        const spyStubTodoClient = new SpyStubTodoClient()
        renderApp(spyStubTodoClient)

        await waitFor(() => {
            expect(spyStubTodoClient.fetchAll).toHaveBeenCalledTimes(1)
        })
    })

    it('should render todos', async () => {
        const spyStubTodoClient = new SpyStubTodoClient()
        spyStubTodoClient.fetchAll.mockResolvedValue([
            {
                id: 1,
                description: 'Learn React',
                finished: false,
            },
        ])

        renderApp(spyStubTodoClient)

        expect(await screen.findByText('Learn React')).toBeInTheDocument()
    })
})

const renderApp = (spyStubTodoClient: TodoClient = new SpyStubTodoClient()) => {
    render(<App client={spyStubTodoClient} />)
}
