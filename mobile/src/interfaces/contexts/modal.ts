import { AlertButton } from 'react-native'

import { ModalState } from '~/components/Modal'
import { EventManagerCallbackParams } from '@events/types'

export interface ShowModalErrorConfig {
  onPressErrorButton?: () => void
  eventParams?: EventManagerCallbackParams
}

export interface ShowModalSuccessConfig {
  onPressSuccessButton?: () => void
  eventParams?: EventManagerCallbackParams
}

export interface ModalContextValues {
  open: (config: ModalState, eventParams?: EventManagerCallbackParams) => void
  close: (eventParams?: EventManagerCallbackParams) => void
  handleShowModalError: (
    errorMessage?: string,
    config?: ShowModalErrorConfig,
  ) => void
  handleShowModalSuccess: (
    successMessage: string,
    config?: ShowModalSuccessConfig,
  ) => void
  alert: (message: string, buttons?: AlertButton[]) => void
}
