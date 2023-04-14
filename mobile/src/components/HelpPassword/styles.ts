import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    marginTop: 20,
  },
  helpText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 5,
  },
  text: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
  },
  empty: {
    color: colors.gray[300],
  },
  error: {
    color: colors.red[500],
    fontFamily: fontFamily.bold,
  },
  success: {
    color: colors.green[500],
  },
})
