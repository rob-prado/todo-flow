import { StyleSheet } from 'react-native'
import { theme } from '../../theme/colors'

const styles = StyleSheet.create({
  inputContainer: { flexDirection: 'row', marginBottom: 24, gap: 12, paddingHorizontal: 16 },
  inputWrapper: { flex: 1 },
  input: {
    height: 52,
    backgroundColor: theme.bgSurface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.textMain,
  },
  inputError: {
    borderColor: theme.error ?? '#EF4444',
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
    color: theme.error ?? '#EF4444',
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
