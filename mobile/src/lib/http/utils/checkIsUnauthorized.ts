import { Alert, AlertButton, AlertOptions } from 'react-native'

import { appConfig } from '~/config/app'
import { HTTPUnauthorizedCallback } from '@http/types/http'
import { httpMessages } from '@http/constants/messages'

export function checkIsUnauthorized(
  error: unknown,
  callback?: HTTPUnauthorizedCallback,
) {
  if (error instanceof Error) {
    const isUnauthorized = error.message === httpMessages.errors.unauthorized

    if (isUnauthorized) {
      unauthorizedLogout(callback)
    }
  }
}

export function unauthorizedLogout(callback?: HTTPUnauthorizedCallback) {
  const message =
    'Notamos que seu token está inválido, por favor, por motivos de segurança refaça o seu Login'
  const buttons: AlertButton[] = [{ onPress: callback, style: 'cancel' }]
  const options: AlertOptions = { userInterfaceStyle: 'dark' }

  return Alert.alert(appConfig.teamName, message, buttons, options)
}
