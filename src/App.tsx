import 'react-native-gesture-handler'
import * as React from 'react'
import { useState, useRef } from 'react'
import { StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LayoutGrid, List } from 'lucide-react-native'
import { TodoDTO } from './types'
import { TodoInput, TodoList } from './components'
import { theme } from './theme/colors'

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
        <View style={styles.logoContainer}>
          <View style={styles.logoDotCyan} />
          <View style={styles.logoDotGreen} />
          <Text style={styles.logo}>TODO Flow</Text>
        </View>
        <TouchableOpacity
          onPress={() => setViewMode((prev) => (prev === 'list' ? 'grid' : 'list'))}
          style={styles.iconButton}
          accessibilityRole="button">
          {viewMode === 'list' ? (
            <LayoutGrid color={theme.primaryCyan} size={24} />
          ) : (
            <List color={theme.primaryCyan} size={24} />
          )}
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
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={theme.bgDark} />
        <AppContent />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, backgroundColor: theme.bgDark },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoDotCyan: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.primaryCyan },
  logoDotGreen: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.primaryGreen },
  logo: { fontSize: 24, fontWeight: 'bold', color: theme.textMain, letterSpacing: 1 },
  iconButton: { minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' },
})
