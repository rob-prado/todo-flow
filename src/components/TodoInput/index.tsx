import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Plus } from 'lucide-react-native'
import { useTodoStore } from '../../store/useTodoStore'
import { theme } from '../../theme/colors'
import styles from './styles'

const TodoInput = () => {
  const [inputValue, setInputValue] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handlePress = () => {
    if (!inputValue.trim()) return
    addTodo(inputValue)
    setInputValue('')
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="O que faremos hoje?"
        placeholderTextColor={theme.textMuted}
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handlePress}
        selectionColor={theme.primaryCyan}
        accessibilityLabel="Campo de entrada para nova tarefa"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel="Adicionar tarefa">
        <Plus color={theme.bgDark} size={24} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  )
}

export default TodoInput
