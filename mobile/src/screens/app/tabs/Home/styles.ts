import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontSize, fontFamily } = useTheme()

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  list: {
    padding: 20,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  countTitle: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
  },
  count: {
    color: colors.purple[300],
    fontFamily: fontFamily.black,
    fontSize: fontSize.md,
  },
})
