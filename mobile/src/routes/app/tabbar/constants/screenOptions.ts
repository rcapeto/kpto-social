import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useTheme } from '~/hooks/useTheme'

const { colors, isAndroid } = useTheme()

export const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.purple[300],
  tabBarInactiveTintColor: colors.gray[300],
  tabBarStyle: {
    backgroundColor: colors.gray[800],
    borderTopWidth: 0,
    height: isAndroid ? 65 : 90,
  },
  tabBarLabelStyle: {
    padding: isAndroid ? 10 : 0,
  },
}
