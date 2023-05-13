import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { paths } from '~/routes/config/paths'

import { TabRoutes } from '~/routes/app/tabbar'
import { PostDetail } from '~/screens/app/others/Post/Detail'
import { DeveloperDetail } from '~/screens/app/others/Developer/Detail'
import { DeveloperUpdate } from '~/screens/app/others/Developer/Update'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={paths.bottomTabs} component={TabRoutes} />
      <Screen name={paths.posts.detail} component={PostDetail} />
      <Screen name={paths.developers.detail} component={DeveloperDetail} />
      <Screen name={paths.developers.update} component={DeveloperUpdate} />
    </Navigator>
  )
}
