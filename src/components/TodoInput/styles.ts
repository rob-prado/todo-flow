import { StyleSheet } from 'react-native'
import { theme } from '../../theme/colors'

const styles = StyleSheet.create({
  inputContainer: { flexDirection: 'row', marginBottom: 24, gap: 12, paddingHorizontal: 16 },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: theme.bgSurface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.textMain,
  },
  addButton: {
    backgroundColor: theme.primaryCyan,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    minHeight: 52,
    minWidth: 52,
  },
})

export default styles
