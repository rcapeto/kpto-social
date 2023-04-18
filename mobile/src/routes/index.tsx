import { NavigationContainer } from '@react-navigation/native'
import { AuthenticationRoutes } from '~/routes/authentication'

export function Routes() {
  return (
    <NavigationContainer>
      <AuthenticationRoutes />
    </NavigationContainer>
  )
}
