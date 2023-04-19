import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.purple[500],
    fontSize: fontSize.sm,
    marginTop: 6,
  },
})
