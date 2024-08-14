import { TodoClient } from './TodoClient.ts'
import React, { useCallback, useEffect, useState } from 'react'
import { Todo } from './TodoModel.ts'

interface Props {
    client: TodoClient
}

const App: React.FC<Props> = ({ client }) => {
    const [todos, setTodos] = React.useState<Todo[]>([])
    const [newTask, setNewTask] = useState('')

    const fetchTodos = useCallback(async () => {
        const fetched = await client.fetchAll()
        setTodos(fetched)
    }, [client])

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    return (
        <>
            <h1>Todo App</h1>
            <div>
                <input
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value)
                    }}
                    placeholder="Enter a new task"
                />
                <button
                    disabled={newTask.trim().length === 0}
                    onClick={async () => {
                        const saved = await client.create(newTask)
                        setTodos([...todos, saved])
                        setNewTask('')
                    }}
                >
                    Save
                </button>
            </div>
            <ul>
                {todos.map((todo) => {
                    return <li key={todo.id}>{todo.description}</li>
                })}
            </ul>
        </>
    )
}

export default App
