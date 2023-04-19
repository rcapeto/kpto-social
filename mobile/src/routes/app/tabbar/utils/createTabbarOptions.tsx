import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '~/hooks/useTheme'

interface CreateOptionsParams {
  label?: string
  icon: keyof typeof Feather.glyphMap
}

const { fontSize } = useTheme()

export function createTabbarOptions(
  params: CreateOptionsParams,
): BottomTabNavigationOptions {
  const size = fontSize.lg

  return {
    tabBarIcon: ({ color }) => (
      <Feather name={params.icon} size={size} color={color} />
    ),
    tabBarLabel: params.label,
  }
}
