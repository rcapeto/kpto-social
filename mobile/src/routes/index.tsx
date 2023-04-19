import { NavigationContainer } from '@react-navigation/native'
import { Text } from 'react-native'

import { RenderValidation } from '~/components/RenderValidation'
import { useAccount } from '~/hooks/useAccount'
import { AuthenticationRoutes } from '~/routes/authentication'
import { LoadingPage } from '~/screens/static/Loading'

export function Routes() {
  const { checkIsLogged, isLogged } = useAccount()

  return (
    <NavigationContainer>
      <RenderValidation
        validation={checkIsLogged}
        validComponent={<LoadingPage />}
        unvalidComponent={
          <RenderValidation
            validation={isLogged}
            validComponent={<Text>Está logado</Text>}
            unvalidComponent={<AuthenticationRoutes />}
          />
        }
      />
    </NavigationContainer>
  )
}
