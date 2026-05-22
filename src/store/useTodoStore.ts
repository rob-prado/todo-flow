import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { TodoDTOSchema, TodoInputSchema } from '../types'
import type { TodoDTO } from '../types'
import storage from './storage'

interface TodoState {
  todos: TodoDTO[]
  viewMode: 'list' | 'grid'
  idCounter: number
  toggleViewMode: () => void
  addTodo: (title: string) => void
  toggleTodoStatus: (id: string) => void
  editTodoTitle: (id: string, newTitle: string) => void
  deleteTodo: (id: string) => void
  clearCompletedTodos: () => void
}

const mmkvStorage = createJSONStorage(() => ({
  getItem: (name: string): string | null => {
    const value = storage.getString(name)
    return value ?? null
  },
  setItem: (name: string, value: string): void => {
    storage.set(name, value)
  },
  removeItem: (name: string): void => {
    ;(storage as unknown as { delete: (key: string) => void }).delete(name)
  },
}))

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      viewMode: 'list',
      idCounter: 0,

      toggleViewMode: () =>
        set((state) => ({ viewMode: state.viewMode === 'list' ? 'grid' : 'list' })),

      addTodo: (title) =>
        set((state) => {
          const parsed = TodoInputSchema.safeParse({ title })
          if (!parsed.success) return state

          const nextId = state.idCounter + 1

          const newTodo = TodoDTOSchema.parse({
            id: nextId.toString(),
            title: parsed.data.title,
            completed: false,
            createdAt: Date.now(),
          })

          return {
            todos: [newTodo, ...state.todos],
            idCounter: nextId,
          }
        }),

      toggleTodoStatus: (id) =>
        set((state) => ({
          todos: state.todos.map((currentTodo) =>
            currentTodo.id === id
              ? { ...currentTodo, completed: !currentTodo.completed }
              : currentTodo,
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
    }),
    {
      name: 'todo-storage',
      storage: mmkvStorage,
      partialize: (state) => ({ todos: state.todos, idCounter: state.idCounter }),
    },
  ),
)
