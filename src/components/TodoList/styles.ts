import { StyleSheet } from 'react-native'
import { theme } from '../../theme/colors'

const styles = StyleSheet.create({
  listContent: { paddingBottom: 40 },
  columnWrapper: { paddingHorizontal: 8 },
  listItem: { width: '100%' },
  footerContainer: { marginTop: 16 },
  completedHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.primaryGreen,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  gridWrapper: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 },
  gridItem: { width: '50%' },
  clearButton: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.bgSurface,
    minHeight: 44,
  },
  pressed: { opacity: 0.7 },
  clearButtonText: { color: theme.textMuted, fontSize: 14, fontWeight: '600' },
})

export default styles
