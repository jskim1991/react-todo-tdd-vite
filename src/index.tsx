import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DefaultTodoClient } from './TodoClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App client={new DefaultTodoClient()} />
    </React.StrictMode>
)
