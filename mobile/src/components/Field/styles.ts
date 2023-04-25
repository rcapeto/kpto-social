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
  valueContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray[800],
    padding: 15,
    borderRadius: 8,
  },
  value: {
    flex: 1,
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.purple[300],
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: fontSize.xs,
    color: colors.purple[300],
    fontFamily: fontFamily.regular,
  },
})
