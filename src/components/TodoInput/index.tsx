import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Plus } from 'lucide-react-native'
import { useTodoStore } from '../../store/useTodoStore'
import { TodoInputSchema } from '../../types'
import { theme } from '../../theme/colors'
import styles from './styles'

const TodoInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const addTodo = useTodoStore((state) => state.addTodo)

  const handlePress = () => {
    setError(null)

    const result = TodoInputSchema.safeParse({ title: inputValue })

    if (!result.success) {
      const firstError = result.error.errors[0]?.message ?? 'Entrada inválida'
      setError(firstError)
      return
    }

    addTodo(result.data.title)
    setInputValue('')
  }

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="O que faremos hoje?"
          placeholderTextColor={theme.textMuted}
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text)
            if (error) setError(null)
          }}
          onSubmitEditing={handlePress}
          selectionColor={theme.primaryCyan}
          accessibilityLabel="Campo de entrada para nova tarefa"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
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
