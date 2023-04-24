import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { fontSize, fontFamily, colors } = useTheme()

export default StyleSheet.create({
  comment: {
    marginBottom: 20,
    backgroundColor: colors.gray[800],
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  commentAuthorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentAuthorName: {
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    flex: 1,
    marginLeft: 8,
  },
  commentDate: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.gray[200],
  },
  commentContent: {
    marginTop: 25,
  },
  commentText: {
    color: colors.white,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md + 10,
  },
})
