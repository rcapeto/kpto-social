import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontSize, fontFamily } = useTheme()

export default StyleSheet.create({
  container: {
    marginBottom: 40,
    backgroundColor: colors.gray[600],
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorContent: {
    flex: 1,
    marginLeft: 10,
  },
  authorName: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
  },
  authorTechContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  authorTechText: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.purple[300],
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: fontSize.xs,
    color: colors.purple[300],
    fontFamily: fontFamily.regular,
  },
  postContainer: {
    marginTop: 20,
  },
  postImage: {
    flex: 1,
    height: 300,
  },
  postTitle: {
    fontSize: fontSize.lg * 1.025,
    fontFamily: fontFamily.bold,
    color: colors.gray[200],
    marginBottom: 20,
  },
  postActions: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusItem: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusItemText: {
    color: colors.gray[200],
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    marginLeft: 5,
  },
  postDate: {
    color: colors.gray[200],
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
  },
  postDescription: {
    marginTop: 20,
    color: colors.gray[200],
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
  },
  buttonContainer: {
    marginTop: 10,
  },
})
