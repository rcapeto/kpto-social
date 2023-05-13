import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontSize, fontFamily } = useTheme()

export default StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    color: colors.white,
    fontFamily: fontFamily.black,
    fontSize: fontSize.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  actionText: {
    color: colors.gray[200],
    marginLeft: 8,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
  },
})
