import { TodoClient } from './TodoClient.ts'
import React, { useEffect } from 'react'
import { Todo } from './TodoModel.ts'

interface Props {
    client: TodoClient
}

const App: React.FC<Props> = ({ client }) => {
    const [todos, setTodos] = React.useState<Todo[]>([])

    const fetchTodos = async () => {
        const fetched = await client.fetchAll()
        setTodos(fetched)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <>
            <div>Todo App</div>
            {todos.map((todo) => {
                return <div key={todo.id}>{todo.description}</div>
            })}
        </>
    )
}

export default App
