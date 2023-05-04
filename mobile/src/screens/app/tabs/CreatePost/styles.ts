import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    marginTop: 25,
    paddingBottom: 60,
  },
  inputs: {
    marginTop: 50,
  },
  input: {
    marginBottom: 20,
  },
  imageText: {
    fontSize: fontSize.md,
    color: colors.white,
    fontFamily: fontFamily.medium,
    paddingBottom: 20,
  },
  button: {
    marginTop: 20,
  },
})
