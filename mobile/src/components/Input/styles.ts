import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {},
  labelContainer: {
    paddingBottom: 20,
  },
  labelText: {
    fontSize: fontSize.md,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  requiredText: {
    fontSize: fontSize.md,
    color: colors.purple[300],
    fontFamily: fontFamily.bold,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingRight: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray[800],
    padding: 15,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
  },
  errorContainer: {
    paddingTop: 10,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.red[500],
    fontFamily: fontFamily.regular,
  },
  renderValidation: {},
})
