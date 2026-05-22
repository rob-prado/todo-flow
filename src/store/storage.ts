import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV({
  id: 'todo-flow-storage',
  encryptionKey: 'todo-flow-key-2026',
})

export default storage
