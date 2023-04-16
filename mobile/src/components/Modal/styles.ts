import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize, isAndroid } = useTheme()

export default StyleSheet.create({
  fadeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadeContent: {
    backgroundColor: colors.gray[600],
    width: '80%',
    minHeight: 150,
    borderRadius: 8,
    padding: 20,
  },
  slideContainer: {
    backgroundColor: colors.gray[600],
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingBottom: isAndroid ? 20 : 30,
    minHeight: 210,
  },
  slideContent: {
    flex: 1,
  },
  iconContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.white,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  description: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.white,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  error: {
    color: colors.red[500],
  },
  success: {
    color: colors.green[500],
  },
})
