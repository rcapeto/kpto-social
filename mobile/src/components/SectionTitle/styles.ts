import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontFamily: fontFamily.black,
  },
})
