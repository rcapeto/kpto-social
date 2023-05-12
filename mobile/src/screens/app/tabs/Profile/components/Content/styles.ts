import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    marginTop: 25,
    paddingBottom: 60,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 65,
  },
  sectionTitle: {
    marginVertical: 30,
  },
  input: {
    marginBottom: 20,
  },
  buttonsContainer: {
    marginTop: 20,
  },
})
