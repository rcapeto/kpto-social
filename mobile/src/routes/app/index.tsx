import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { paths } from '~/routes/config/paths'

import { TabRoutes } from '~/routes/app/tabbar'
import { PostDetail } from '~/screens/app/others/Post/Detail'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={paths.bottomTabs} component={TabRoutes} />
      <Screen name={paths.posts.detail} component={PostDetail} />
    </Navigator>
  )
}
