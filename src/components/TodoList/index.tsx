import { FlatList, TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import TodoItem from '../TodoItem'
import { TodoDTO } from '../../types'

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
    <FlatList
      key={viewMode}
      data={pending}
      keyExtractor={(item) => item.id}
      numColumns={viewMode === 'grid' ? 2 : 1}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          viewMode={viewMode}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        completed.length > 0 ? (
          <View style={styles.footerContainer}>
            <Text style={styles.completedHeader}>Concluídas</Text>

            <View style={viewMode === 'grid' ? styles.gridWrapper : undefined}>
              {completed.map((item) => (
                <View key={item.id} style={viewMode === 'grid' ? styles.gridItem : undefined}>
                  <TodoItem
                    todo={item}
                    viewMode={viewMode}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={onClearCompleted}
              accessibilityRole="button"
              accessibilityLabel="Limpar histórico">
              <Text style={styles.clearButtonText}>Limpar Histórico de Concluídas</Text>
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  )
}

const styles = StyleSheet.create({
  footerContainer: { marginTop: 16 },
  completedHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  gridWrapper: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 },
  gridItem: { width: '50%' },
  clearButton: { marginTop: 16, paddingVertical: 16, alignItems: 'center', minHeight: 44 },
  clearButtonText: { color: '#718096', fontSize: 14, textDecorationLine: 'underline' },
})

export default TodoList
