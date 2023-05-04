import { PropsWithChildren, createContext, useRef } from 'react'
import { Alert, AlertButton } from 'react-native'
import { Feather } from '@expo/vector-icons'

import Modal, { ModalActions, ModalState } from '~/components/Modal'
import {
  ModalContextValues,
  ShowModalErrorConfig,
  ShowModalSuccessConfig,
} from '~/interfaces/contexts/modal'
import { EventManagerCallbackParams } from '@events/types'
import { useTheme } from '~/hooks/useTheme'
import { appConfig } from '~/config/app'

export const ModalContext = createContext({} as ModalContextValues)

export function ModalProvider(props: PropsWithChildren) {
  const { colors } = useTheme()
  const modalRef = useRef<ModalActions>(null)

  function open(config: ModalState, eventParams?: EventManagerCallbackParams) {
    const modal = modalRef.current
    modal?.openModal(config, eventParams)
  }

  function close(eventParams?: EventManagerCallbackParams) {
    const modal = modalRef.current
    modal?.closeModal(eventParams)
  }

  function handleShowModalError(
    errorMessage?: string,
    config?: ShowModalErrorConfig,
  ) {
    const modal = modalRef.current

    modal?.openModal(
      {
        isError: true,
        title: 'Ops! Ocorreu algum erro',
        description: errorMessage,
        icon: <Feather name="alert-circle" color={colors.red[500]} size={50} />,
        buttons: [
          {
            text: 'Ok!',
            type: 'error',
            fullWidth: true,
            onPress: config?.onPressErrorButton,
          },
        ],
      },
      config?.eventParams,
    )
  }

  function alert(message: string, buttons?: AlertButton[]) {
    Alert.alert(appConfig.teamName, message, buttons, {
      userInterfaceStyle: 'dark',
    })
  }

  function handleShowModalSuccess(
    successMessage: string,
    config?: ShowModalSuccessConfig,
  ) {
    const modal = modalRef.current

    modal?.openModal(
      {
        isSuccess: true,
        title: 'Sucesso!',
        description: successMessage,
        icon: (
          <Feather name="check-circle" color={colors.green[500]} size={50} />
        ),
        buttons: [
          {
            text: 'Ok!',
            type: 'success',
            fullWidth: true,
            onPress: config?.onPressSuccessButton,
          },
        ],
      },
      config?.eventParams,
    )
  }

  return (
    <ModalContext.Provider
      value={{
        close,
        open,
        handleShowModalError,
        alert,
        handleShowModalSuccess,
      }}>
      {props.children}
      <Modal ref={modalRef} />
    </ModalContext.Provider>
  )
}
