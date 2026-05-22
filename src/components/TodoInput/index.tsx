import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'

interface Props {
  onAdd: (title: string) => void
}
const TodoInput = ({ onAdd }: Props) => {
  const [inputValue, setInputValue] = useState('')

  const handlePress = () => {
    if (!inputValue.trim()) return
    onAdd(inputValue)
    setInputValue('')
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nova tarefa..."
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handlePress}
        accessibilityLabel="Campo de entrada para nova tarefa"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel="Adicionar tarefa">
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: { flexDirection: 'row', marginBottom: 24, gap: 12, paddingHorizontal: 16 },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#004B87',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    minHeight: 48,
    minWidth: 44,
  },
  addButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
})

export default TodoInput
