import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontFamily, fontSize } = useTheme()

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
    borderRadius: 8,
    height: 52,
  },
  error: {
    backgroundColor: colors.red[500],
  },
  success: {
    backgroundColor: colors.green[500],
  },
  info: {
    backgroundColor: colors.blue[500],
  },
  default: {
    backgroundColor: colors.purple[500],
  },
  errorBorder: {
    borderColor: colors.red[500],
  },
  successBorder: {
    borderColor: colors.green[500],
  },
  infoBorder: {
    borderColor: colors.blue[500],
  },
  defaultBorder: {
    borderColor: colors.purple[500],
  },
  noBorder: {
    borderWidth: 0,
    borderColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.gray[300],
  },
  outlined: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: 'red',
    minWidth: 100,
  },
  fullWidth: {
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
  },
  errorTextColor: {
    color: colors.red[500],
  },
  successTextColor: {
    color: colors.green[500],
  },
  infoTextColor: {
    color: colors.blue[500],
  },
  defaultTextColor: {
    color: colors.purple[500],
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 5,
  },
  iconRight: {
    marginLeft: 5,
  },
})
