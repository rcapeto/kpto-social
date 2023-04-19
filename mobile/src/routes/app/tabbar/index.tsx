import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { bottomTabs } from '~/routes/app/tabbar/constants/tabs'
import { screenOptions } from '~/routes/app/tabbar/constants/screenOptions'

const { Navigator, Screen } = createBottomTabNavigator()

export function TabRoutes() {
  return (
    <Navigator screenOptions={screenOptions}>
      {bottomTabs.map((tab) => (
        <Screen key={tab.name} {...tab} />
      ))}
    </Navigator>
  )
}
