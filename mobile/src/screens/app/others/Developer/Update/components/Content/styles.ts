import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
})
