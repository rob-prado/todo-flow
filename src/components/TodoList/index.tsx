import { Pressable, Text, View } from 'react-native'
import Animated, { LinearTransition, FadeInDown, FadeOut } from 'react-native-reanimated'
import { Trash2 } from 'lucide-react-native'
import TodoItem from '../TodoItem'
import { useTodoStore } from '../../store/useTodoStore'
import { theme } from '../../theme/colors'
import styles from './styles'

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)
  const viewMode = useTodoStore((state) => state.viewMode)
  const clearCompletedTodos = useTodoStore((state) => state.clearCompletedTodos)

  const pendingTodos = todos.filter((currentTodo) => !currentTodo.completed)
  const completedTodos = todos.filter((currentTodo) => currentTodo.completed)

  return (
    <Animated.FlatList
      key={viewMode}
      data={pendingTodos}
      keyExtractor={(currentTodo) => currentTodo.id}
      numColumns={viewMode === 'grid' ? 2 : 1}
      columnWrapperStyle={viewMode === 'grid' ? styles.columnWrapper : undefined}
      itemLayoutAnimation={LinearTransition.duration(300)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      renderItem={({ item: currentTodo }) => (
        <Animated.View
          entering={FadeInDown.duration(400)}
          exiting={FadeOut.duration(200)}
          layout={LinearTransition.duration(300)}
          style={viewMode === 'grid' ? styles.gridItem : styles.listItem}>
          <TodoItem todo={currentTodo} />
        </Animated.View>
      )}
      ListFooterComponent={
        completedTodos.length > 0 ? (
          <Animated.View layout={LinearTransition.duration(300)} style={styles.footerContainer}>
            <Text style={styles.completedHeader}>Concluídas</Text>

            <View style={viewMode === 'grid' ? styles.gridWrapper : undefined}>
              {completedTodos.map((completedTodo) => (
                <Animated.View
                  key={completedTodo.id}
                  entering={FadeInDown.duration(400)}
                  exiting={FadeOut.duration(200)}
                  layout={LinearTransition.duration(300)}
                  style={viewMode === 'grid' ? styles.gridItem : styles.listItem}>
                  <TodoItem todo={completedTodo} />
                </Animated.View>
              ))}
            </View>

            <Pressable
              style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
              onPress={clearCompletedTodos}
              accessibilityRole="button"
              accessibilityLabel="Limpar histórico">
              <Trash2 color={theme.textMuted} size={18} />
              <Text style={styles.clearButtonText}>Limpar Histórico de Concluídas</Text>
            </Pressable>
          </Animated.View>
        ) : null
      }
    />
  )
}

export default TodoList
