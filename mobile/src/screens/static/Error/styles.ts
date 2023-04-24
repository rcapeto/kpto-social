import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.purple[500],
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 20,
  },
  description: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    marginBottom: 20,
  },
})
