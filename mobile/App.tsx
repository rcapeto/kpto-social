import { StatusBar } from 'expo-status-bar'
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from '@expo-google-fonts/roboto'

import { Fragment } from 'react'
import { Routes } from '~/routes'
import { LoadingPage } from '~/screens/static/Loading'
import { RenderValidation } from '~/components/RenderValidation'

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  })

  return (
    <Fragment>
      <StatusBar style="light" />

      <RenderValidation
        validation={isFontsLoaded}
        validComponent={<Routes />}
        unvalidComponent={<LoadingPage />}
      />
    </Fragment>
  )
}
