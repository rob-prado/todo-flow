import { TouchableOpacity, Text, View } from 'react-native'
import Animated, { LinearTransition, FadeInDown, FadeOut } from 'react-native-reanimated'
import { Trash2 } from 'lucide-react-native'
import TodoItem from '../TodoItem'
import { TodoDTO } from '../../types'
import { theme } from '../../theme/colors'
import styles from './styles'

interface Props {
  pending: TodoDTO[]
  completed: TodoDTO[]
  viewMode: 'list' | 'grid'
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
  onClearCompleted: () => void
}

const TodoList = ({
  pending,
  completed,
  viewMode,
  onToggle,
  onEdit,
  onDelete,
  onClearCompleted,
}: Props) => {
  return (
    <Animated.FlatList
      key={viewMode}
      data={pending}
      keyExtractor={(item) => item.id}
      numColumns={viewMode === 'grid' ? 2 : 1}
      columnWrapperStyle={viewMode === 'grid' ? styles.columnWrapper : undefined}
      itemLayoutAnimation={LinearTransition.duration(300)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <Animated.View
          entering={FadeInDown.duration(400)}
          exiting={FadeOut.duration(200)}
          layout={LinearTransition.duration(300)}
          style={viewMode === 'grid' ? styles.gridItem : styles.listItem}>
          <TodoItem
            todo={item}
            viewMode={viewMode}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Animated.View>
      )}
      ListFooterComponent={
        completed.length > 0 ? (
          <Animated.View layout={LinearTransition.duration(300)} style={styles.footerContainer}>
            <Text style={styles.completedHeader}>Concluídas</Text>

            <View style={viewMode === 'grid' ? styles.gridWrapper : undefined}>
              {completed.map((item) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.duration(400)}
                  exiting={FadeOut.duration(200)}
                  layout={LinearTransition.duration(300)}
                  style={viewMode === 'grid' ? styles.gridItem : styles.listItem}>
                  <TodoItem
                    todo={item}
                    viewMode={viewMode}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </Animated.View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={onClearCompleted}
              accessibilityRole="button"
              accessibilityLabel="Limpar histórico">
              <Trash2 color={theme.textMuted} size={18} />
              <Text style={styles.clearButtonText}>Limpar Histórico de Concluídas</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : null
      }
    />
  )
}

export default TodoList
