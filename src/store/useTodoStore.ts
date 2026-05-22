import { create } from 'zustand'
import { TodoDTO } from '../types'

interface TodoState {
  todos: TodoDTO[]
  viewMode: 'list' | 'grid'
  toggleViewMode: () => void
  addTodo: (title: string) => void
  toggleTodoStatus: (id: string) => void
  editTodoTitle: (id: string, newTitle: string) => void
  deleteTodo: (id: string) => void
  clearCompletedTodos: () => void
}

let idCounter = 0

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  viewMode: 'list',
  toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === 'list' ? 'grid' : 'list' })),
  addTodo: (title) =>
    set((state) => {
      idCounter += 1
      const newTodo: TodoDTO = {
        id: idCounter.toString(),
        title,
        completed: false,
        createdAt: Date.now(),
      }
      return { todos: [newTodo, ...state.todos] }
    }),
  toggleTodoStatus: (id) =>
    set((state) => ({
      todos: state.todos.map((currentTodo) =>
        currentTodo.id === id ? { ...currentTodo, completed: !currentTodo.completed } : currentTodo,
      ),
    })),
  editTodoTitle: (id, newTitle) =>
    set((state) => ({
      todos: state.todos.map((currentTodo) =>
        currentTodo.id === id ? { ...currentTodo, title: newTitle } : currentTodo,
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((currentTodo) => currentTodo.id !== id),
    })),
  clearCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.filter((currentTodo) => !currentTodo.completed),
    })),
}))
