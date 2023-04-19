import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { paths } from '~/routes/config/paths'
import { TabRoutes } from '~/routes/app/tabbar'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={paths.bottomTabs} component={TabRoutes} />
    </Navigator>
  )
}
