import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { TodoDTO } from '../../types'

interface Props {
  todo: TodoDTO
  viewMode: 'list' | 'grid'
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}

const TodoItem = ({ todo, viewMode, onToggle, onEdit, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [localTitle, setLocalTitle] = useState(todo.title)

  const handleSave = () => {
    if (!localTitle.trim()) return
    onEdit(todo.id, localTitle)
    setIsEditing(false)
  }

  return (
    <View
      style={[styles.container, viewMode === 'grid' && styles.gridContainer]}
      accessibilityRole="button"
      accessibilityState={{ checked: todo.completed }}
      accessibilityLabel={`Tarefa: ${todo.title}, status: ${todo.completed ? 'Concluída' : 'Pendente'}`}>
      <TouchableOpacity
        style={[styles.checkbox, todo.completed && styles.checkboxDisabled]}
        onPress={() => onToggle(todo.id)}
        disabled={todo.completed}
        accessibilityRole="checkbox"
        accessibilityLabel="Alternar status">
        {todo.completed && <View style={styles.checkedInner} />}
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={localTitle}
          onChangeText={setLocalTitle}
          onBlur={handleSave}
          onSubmitEditing={handleSave}
          autoFocus
          accessibilityLabel="Editar título da tarefa"
        />
      ) : (
        <Text
          style={[styles.title, todo.completed && styles.titleCompleted]}
          onPress={() => !todo.completed && setIsEditing(true)}>
          {todo.title}
        </Text>
      )}

      {!todo.completed && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(todo.id)}
          accessibilityRole="button"
          accessibilityLabel="Excluir tarefa">
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 44,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#004B87',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    minWidth: 44,
    minHeight: 44,
  },
  checkboxDisabled: {
    opacity: 0.6,
  },
  checkedInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#004B87' },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A202C',
    padding: 0,
    ...Platform.select({ ios: { paddingVertical: 4 }, android: { paddingVertical: 0 } }),
  },
  title: { flex: 1, fontSize: 16, color: '#1A202C' },
  titleCompleted: { textDecorationLine: 'line-through', color: '#A0AEC0' },
  deleteButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  deleteText: { color: '#E53E3E', fontWeight: 'bold' },
})

export default TodoItem
