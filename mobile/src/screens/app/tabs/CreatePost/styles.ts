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
  selectImageContainer: {
    height: 224,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray[600],
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    width: '100%',
  },
  action: {
    borderRadius: 20,
    padding: 14,
    backgroundColor: colors.gray[800],
  },
  selectImageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[800],
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  selectedImage: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
})
