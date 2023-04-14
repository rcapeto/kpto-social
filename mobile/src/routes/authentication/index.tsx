import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { paths } from '~/routes/config/paths'

import { Login } from '~/screens/authentication/Login'
import { Register } from '~/screens/authentication/Register'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthenticationRoutes() {
  const path = paths.authentication

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={path.login} component={Login} />
      <Screen name={path.register} component={Register} />
    </Navigator>
  )
}
