import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react-native'
import { Alert } from 'react-native'
import App from '../App'
import { useTodoStore } from '../store/useTodoStore'

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
  }
})

jest.spyOn(Alert, 'alert')

describe('Fluxos de TODO (CRUD Completo)', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [], viewMode: 'list' })
    jest.clearAllMocks()
  })

  it('não deve adicionar uma tarefa com texto contendo apenas espaços', () => {
    render(<App />)
    const input = screen.getByLabelText('Campo de entrada para nova tarefa')
    const addButton = screen.getByLabelText('Adicionar tarefa')

    fireEvent.changeText(input, '   ')
    fireEvent.press(addButton)

    expect(screen.queryByLabelText('Excluir tarefa')).toBeNull()
  })

  it('deve editar o título de uma tarefa existente via blur/submit', () => {
    render(<App />)
    const input = screen.getByLabelText('Campo de entrada para nova tarefa')
    const addButton = screen.getByLabelText('Adicionar tarefa')

    fireEvent.changeText(input, 'Estudar Jest')
    fireEvent.press(addButton)

    const taskText = screen.getByText('Estudar Jest')
    fireEvent.press(taskText)

    const editInput = screen.getByLabelText('Editar título da tarefa')
    fireEvent.changeText(editInput, 'Estudar RTL-RN')

    fireEvent(editInput, 'submitEditing')

    expect(screen.getByText('Estudar RTL-RN')).toBeTruthy()
    expect(screen.queryByText('Estudar Jest')).toBeNull()
  })

  it('deve exibir um Alerta de confirmação ao tentar excluir no modo grade', () => {
    useTodoStore.setState({ viewMode: 'grid' })
    render(<App />)

    const input = screen.getByLabelText('Campo de entrada para nova tarefa')
    const addButton = screen.getByLabelText('Adicionar tarefa')

    fireEvent.changeText(input, 'Tarefa em Grade')
    fireEvent.press(addButton)

    const deleteButton = screen.getByLabelText('Excluir tarefa')
    fireEvent.press(deleteButton)

    expect(Alert.alert).toHaveBeenCalledWith(
      'Excluir Tarefa',
      'Deseja realmente excluir "Tarefa em Grade"?',
      expect.any(Array),
    )

    const alertCallArgs = (Alert.alert as jest.Mock).mock.calls[0]
    const confirmButton = (
      alertCallArgs[2] as Array<{ style?: string; onPress?: () => void }>
    ).find((btn) => btn.style === 'destructive')

    act(() => {
      confirmButton?.onPress?.()
    })

    expect(screen.queryByText('Tarefa em Grade')).toBeNull()
  })

  it('deve concluir uma tarefa e permitir a limpeza do histórico', () => {
    render(<App />)

    const input = screen.getByLabelText('Campo de entrada para nova tarefa')
    const addButton = screen.getByLabelText('Adicionar tarefa')

    fireEvent.changeText(input, 'Comprar café')
    fireEvent.press(addButton)

    const checkbox = screen.getByLabelText('Alternar status')
    fireEvent.press(checkbox)

    const clearButton = screen.getByLabelText('Limpar histórico')
    fireEvent.press(clearButton)

    expect(screen.queryByText('Comprar café')).toBeNull()
  })
})
