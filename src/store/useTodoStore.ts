import { create } from 'zustand'
import { TodoDTOSchema, TodoInputSchema } from '../types'
import type { TodoDTO } from '../types'

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
      const parsed = TodoInputSchema.safeParse({ title })
      if (!parsed.success) return state

      idCounter += 1

      const newTodo = TodoDTOSchema.parse({
        id: idCounter.toString(),
        title: parsed.data.title,
        completed: false,
        createdAt: Date.now(),
      })

      return { todos: [newTodo, ...state.todos] }
    }),

  toggleTodoStatus: (id) =>
    set((state) => ({
      todos: state.todos.map((currentTodo) =>
        currentTodo.id === id ? { ...currentTodo, completed: !currentTodo.completed } : currentTodo,
      ),
    })),

  editTodoTitle: (id, newTitle) =>
    set((state) => {
      const parsed = TodoInputSchema.safeParse({ title: newTitle })
      if (!parsed.success) return state

      return {
        todos: state.todos.map((currentTodo) =>
          currentTodo.id === id ? { ...currentTodo, title: parsed.data.title } : currentTodo,
        ),
      }
    }),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((currentTodo) => currentTodo.id !== id),
    })),

  clearCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.filter((currentTodo) => !currentTodo.completed),
    })),
}))
