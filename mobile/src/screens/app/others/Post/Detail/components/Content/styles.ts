import { StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors, fontSize, fontFamily } = useTheme()

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.lg * 1.2,
    fontFamily: fontFamily.black,
    marginBottom: 8,
  },
  author: {
    color: colors.gray[200],
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    marginTop: 8,
  },
  image: {
    flex: 1,
    height: 400,
    marginTop: 30,
    borderRadius: 4,
  },
  description: {
    color: colors.gray[200],
    marginTop: 40,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md + 10,
    textAlign: 'justify',
  },
  sectionTitle: {
    marginVertical: 40,
    marginBottom: 30,
  },
  noCommentsContainer: {},
  noCommentsContainerText: {
    color: colors.gray[200],
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md + 10,
  },
  noCommentsContainerBtn: {
    marginTop: 20,
  },
  likeText: {
    color: colors.gray[200],
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md + 10,
  },
  likeBtn: {
    marginTop: 20,
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
  authorBtn: {
    marginTop: 20,
  },
})
