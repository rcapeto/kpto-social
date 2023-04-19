import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, isAndroid } = useTheme()

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.gray[900],
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 20,
  },
  withNotHeader: {
    paddingTop: isAndroid ? 20 : 70,
  },
})
