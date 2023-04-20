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
})
