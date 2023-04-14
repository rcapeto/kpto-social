import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Login } from '~/screens/authentication/Login'
import { Fragment } from 'react'

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  })

  if (!isFontsLoaded) {
    return <Text>Carregando</Text>
  }

  return (
    <Fragment>
      <StatusBar style="light" />
      <Login />
    </Fragment>
  )
}
