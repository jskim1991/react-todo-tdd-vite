import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App.tsx'
import { TodoClient } from './TodoClient.ts'
import { MockTodoClient } from './MockTodoClient.ts'
import { userEvent } from '@testing-library/user-event'

describe('App Tests', () => {
    it('should render title', async () => {
        renderApp()

        expect(
            await screen.findByRole('heading', { name: 'Todo App' })
        ).toBeInTheDocument()
    })

    it('should call todo client to fetch todos', async () => {
        const mockTodoClient = new MockTodoClient()
        renderApp(mockTodoClient)

        await waitFor(() => {
            expect(mockTodoClient.fetchAll).toHaveBeenCalledTimes(1)
        })
    })

    it('should render todos', async () => {
        const mockTodoClient = new MockTodoClient()
        mockTodoClient.fetchAll.mockResolvedValue([
            {
                id: 1,
                description: 'Learn React',
                finished: false,
            },
        ])

        renderApp(mockTodoClient)

        expect(await screen.findByText('Learn React')).toBeInTheDocument()
    })

    it('should display input and save button for new todo', async () => {
        renderApp()

        expect(
            await screen.findByPlaceholderText('Enter a new task')
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    })

    it('should enable the save button when new task is entered', async () => {
        renderApp()

        const input = await screen.findByPlaceholderText('Enter a new task')
        await userEvent.type(input, 'Learn React')

        expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
    })

    it('should call todo client to save a new todo', async () => {
        const mockTodoClient = new MockTodoClient()
        mockTodoClient.create.mockResolvedValue({
            id: 1,
            description: 'Learn React',
            finished: false,
        })
        renderApp(mockTodoClient)

        const input = await screen.findByPlaceholderText('Enter a new task')
        await userEvent.type(input, 'Learn React')
        await userEvent.click(screen.getByRole('button', { name: 'Save' }))

        expect(mockTodoClient.create).toHaveBeenCalledWith('Learn React')
    })

    it('should clear input after saving', async () => {
        const mockTodoClient = new MockTodoClient()
        mockTodoClient.create.mockResolvedValue({
            id: 1,
            description: 'Learn React',
            finished: false,
        })
        renderApp(mockTodoClient)

        const input = await screen.findByPlaceholderText('Enter a new task')
        await userEvent.type(input, 'Learn React')
        await userEvent.click(screen.getByRole('button', { name: 'Save' }))

        expect(input).toHaveValue('')
    })

    it('should display the created todo', async () => {
        const mockTodoClient = new MockTodoClient()
        mockTodoClient.create.mockResolvedValue({
            id: 1,
            description: 'Learn React',
            finished: false,
        })
        renderApp(mockTodoClient)

        const input = await screen.findByPlaceholderText('Enter a new task')
        await userEvent.type(input, 'Learn React')
        await userEvent.click(screen.getByRole('button', { name: 'Save' }))

        expect(await screen.findAllByRole('listitem')).toHaveLength(1)
        expect(screen.getByText('Learn React')).toBeInTheDocument()
    })
})

const renderApp = (mockTodoClient: TodoClient = new MockTodoClient()) => {
    render(<App client={mockTodoClient} />)
}
