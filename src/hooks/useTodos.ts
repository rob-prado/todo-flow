import { useState, useRef } from 'react'
import { TodoDTO } from '../types'

export const useTodos = () => {
  const idCounter = useRef(0)
  const [todos, setTodos] = useState<TodoDTO[]>([])

  const handleAddTodo = (title: string) => {
    idCounter.current += 1

    const newTodo: TodoDTO = {
      id: idCounter.current.toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    }

    setTodos((previousTodos) => [newTodo, ...previousTodos])
  }

  const handleToggleTodoStatus = (id: string) => {
    setTodos((previousTodos) =>
      previousTodos.map((currentTodo) =>
        currentTodo.id === id ? { ...currentTodo, completed: !currentTodo.completed } : currentTodo,
      ),
    )
  }

  const handleEditTodoTitle = (id: string, newTitle: string) => {
    setTodos((previousTodos) =>
      previousTodos.map((currentTodo) =>
        currentTodo.id === id ? { ...currentTodo, title: newTitle } : currentTodo,
      ),
    )
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((previousTodos) => previousTodos.filter((currentTodo) => currentTodo.id !== id))
  }

  const handleClearCompletedTodos = () => {
    setTodos((previousTodos) => previousTodos.filter((currentTodo) => !currentTodo.completed))
  }

  const pendingTodos = todos.filter((currentTodo) => !currentTodo.completed)
  const completedTodos = todos.filter((currentTodo) => currentTodo.completed)

  return {
    pendingTodos,
    completedTodos,
    handleAddTodo,
    handleToggleTodoStatus,
    handleEditTodoTitle,
    handleDeleteTodo,
    handleClearCompletedTodos,
  }
}
