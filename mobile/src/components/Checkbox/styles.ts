import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderColor: colors.white,
  },
  checkboxPurple: {
    borderColor: colors.purple[300],
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.white,
    fontFamily: fontFamily.regular,
    marginLeft: 10,
  },
})
