import * as React from 'react'
import { useState, useRef } from 'react'
import { StatusBar, StyleSheet, useColorScheme, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { TodoDTO } from './types'
import { TodoInput, TodoList } from './components'

function AppContent() {
  const insets = useSafeAreaInsets()
  const idCounter = useRef(0)

  const [todos, setTodos] = useState<TodoDTO[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const handleAdd = (title: string) => {
    idCounter.current += 1
    setTodos([
      { id: idCounter.current.toString(), title, completed: false, createdAt: Date.now() },
      ...todos,
    ])
  }

  const handleToggle = (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  const handleEdit = (id: string, title: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)))
  const handleDelete = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id))
  const handleClearCompleted = () => setTodos((prev) => prev.filter((t) => !t.completed))

  const pendingTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={styles.header}>
        <Text style={styles.logo}>TODO Flow</Text>
        <TouchableOpacity
          onPress={() => setViewMode((prev) => (prev === 'list' ? 'grid' : 'list'))}
          style={styles.iconButton}
          accessibilityRole="button">
          <Text style={styles.iconText}>{viewMode === 'list' ? 'Grid' : 'List'}</Text>
        </TouchableOpacity>
      </View>

      <TodoInput onAdd={handleAdd} />

      <TodoList
        pending={pendingTodos}
        completed={completedTodos}
        viewMode={viewMode}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClearCompleted={handleClearCompleted}
      />
    </View>
  )
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#ffffff"
      />
      <AppContent />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#004B87' },
  iconButton: { minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' },
  iconText: { color: '#004B87', fontWeight: '600' },
})
