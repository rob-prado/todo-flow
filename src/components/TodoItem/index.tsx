import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { Trash } from 'lucide-react-native'
import { TodoDTO } from '../../types'
import { theme } from '../../theme/colors'
import styles from './styles'

interface Props {
  todo: TodoDTO
  viewMode: 'list' | 'grid'
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}

const TodoItem = ({ todo, viewMode, onToggle, onEdit, onDelete }: Props) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)

  const handleSaveEditedTitle = () => {
    if (!editedTitle.trim()) return
    onEdit(todo.id, editedTitle)
    setIsEditingTitle(false)
  }

  const confirmTaskDeletion = () => {
    Alert.alert('Excluir Tarefa', `Deseja realmente excluir "${todo.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onDelete(todo.id) },
    ])
  }

  const animatedDotStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(todo.completed ? theme.primaryGreen : 'transparent', {
      duration: 300,
    }),
    borderColor: withTiming(todo.completed ? theme.primaryGreen : theme.primaryYellow, {
      duration: 300,
    }),
  }))

  const animatedCardStyle = useAnimatedStyle(() => ({
    opacity: withTiming(todo.completed ? 0.7 : 1, { duration: 300 }),
  }))

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteSwipe}
      onPress={() => onDelete(todo.id)}
      accessibilityRole="button"
      accessibilityLabel="Excluir tarefa">
      <Trash color="#FFF" size={20} />
    </TouchableOpacity>
  )

  const ItemContent = (
    <Animated.View
      style={[
        styles.container,
        viewMode === 'grid' && styles.gridContainer,
        todo.completed && styles.containerCompleted,
        animatedCardStyle,
      ]}
      accessibilityRole="button"
      accessibilityState={{ checked: todo.completed }}
      accessibilityLabel={`Tarefa: ${todo.title}, status: ${todo.completed ? 'Concluída' : 'Pendente'}`}>
      {viewMode === 'grid' && !todo.completed && (
        <TouchableOpacity
          style={styles.gridDeleteBtn}
          onPress={confirmTaskDeletion}
          accessibilityRole="button"
          accessibilityLabel="Excluir tarefa">
          <Trash color={theme.textMuted} size={18} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.checkboxTouchWrapper, viewMode === 'grid' && styles.checkboxGridWrapper]}
        onPress={() => onToggle(todo.id)}
        disabled={todo.completed}
        accessibilityRole="checkbox"
        accessibilityLabel="Alternar status">
        <Animated.View style={[styles.statusDot, animatedDotStyle]} />
      </TouchableOpacity>

      {isEditingTitle ? (
        <TextInput
          style={[styles.input, viewMode === 'grid' && styles.inputGrid]}
          value={editedTitle}
          onChangeText={setEditedTitle}
          onBlur={handleSaveEditedTitle}
          onSubmitEditing={handleSaveEditedTitle}
          autoFocus
          selectionColor={theme.primaryCyan}
          accessibilityLabel="Editar título da tarefa"
          multiline={viewMode === 'grid'}
        />
      ) : (
        <Text
          style={[
            styles.title,
            todo.completed && styles.titleCompleted,
            viewMode === 'grid' && styles.titleGrid,
          ]}
          onPress={() => !todo.completed && setIsEditingTitle(true)}>
          {todo.title}
        </Text>
      )}
    </Animated.View>
  )

  if (todo.completed || viewMode === 'grid') return ItemContent

  return (
    <ReanimatedSwipeable renderRightActions={renderRightActions} overshootRight={false}>
      {ItemContent}
    </ReanimatedSwipeable>
  )
}

export default TodoItem
