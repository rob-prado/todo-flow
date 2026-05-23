import 'react-native-gesture-handler'
import * as React from 'react'
import { StatusBar, StyleSheet, View, Text, Pressable } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LayoutGrid, List } from 'lucide-react-native'
import { TodoInput, TodoList } from './components'
import { useTodoStore } from './store/useTodoStore'
import { theme } from './theme/colors'

function AppContent() {
  const insets = useSafeAreaInsets()
  const viewMode = useTodoStore((state) => state.viewMode)
  const toggleViewMode = useTodoStore((state) => state.toggleViewMode)

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
        <Pressable
          onPress={toggleViewMode}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          accessibilityRole="button">
          {viewMode === 'list' ? (
            <LayoutGrid color={theme.primaryCyan} size={24} />
          ) : (
            <List color={theme.primaryCyan} size={24} />
          )}
        </Pressable>
      </View>

      <TodoInput />

      <TodoList />
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
  pressed: { opacity: 0.7 },
})
