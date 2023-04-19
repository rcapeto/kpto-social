import { NavigationContainer } from '@react-navigation/native'

import { RenderValidation } from '~/components/RenderValidation'
import { useAccount } from '~/hooks/useAccount'
import { AuthenticationRoutes } from '~/routes/authentication'
import { LoadingPage } from '~/screens/static/Loading'
import { AppRoutes } from '~/routes/app'

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
            validComponent={<AppRoutes />}
            unvalidComponent={<AuthenticationRoutes />}
          />
        }
      />
    </NavigationContainer>
  )
}
