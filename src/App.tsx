import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    }
    return []
  })

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    if (text.trim() === '') return
    
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false
    }
    
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="container w-full mx-auto max-w-xl p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>
      
      <TodoForm onAddTodo={addTodo} />
      
      {totalCount > 0 && (
        <div className="todo-stats py-2 border-b border-gray-200 mb-4">
          <p className="text-sm">
            {completedCount} of {totalCount} tasks completed
          </p>
        </div>
      )}
      
      <TodoList 
        todos={todos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
      />
      
      {totalCount === 0 && (
        <div className="empty-state p-8 border border-dashed rounded-md text-center mt-8 text-gray-500">
          <p>No todos yet. Add one above!</p>
        </div>
      )}
    </div>
  )
}

export default App
