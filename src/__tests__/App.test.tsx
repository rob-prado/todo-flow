import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import App from '../App'

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaConsumer: ({ children }: { children: (insetValue: typeof inset) => React.ReactNode }) =>
      children(inset),
    useSafeAreaInsets: () => inset,
  }
})

describe('App Root', () => {
  it('deve renderizar o cabeçalho corretamente', () => {
    render(<App />)
    expect(screen.getByText('TODO Flow')).toBeTruthy()
  })

  it('deve adicionar, concluir e limpar tarefas na hierarquia principal', () => {
    render(<App />)

    const input = screen.getByLabelText('Campo de entrada para nova tarefa')
    const addButton = screen.getByLabelText('Adicionar tarefa')

    fireEvent.changeText(input, 'Comprar café')
    fireEvent.press(addButton)

    expect(screen.getByText('Comprar café')).toBeTruthy()

    const checkbox = screen.getByLabelText('Alternar status')
    fireEvent.press(checkbox)

    const clearButton = screen.getByLabelText('Limpar histórico')
    expect(clearButton).toBeTruthy()

    fireEvent.press(clearButton)

    expect(screen.queryByText('Comprar café')).toBeNull()
  })

  it('deve excluir uma tarefa diretamente do ecrã principal', () => {
    render(<App />)

    const input = screen.getByLabelText('Campo de entrada para nova tarefa')
    const addButton = screen.getByLabelText('Adicionar tarefa')

    fireEvent.changeText(input, 'Tarefa temporária')
    fireEvent.press(addButton)

    const deleteButton = screen.getByLabelText('Excluir tarefa')
    fireEvent.press(deleteButton)

    expect(screen.queryByText('Tarefa temporária')).toBeNull()
  })
})
