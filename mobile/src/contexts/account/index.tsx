import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Feather } from '@expo/vector-icons'

import { AccountContextValues } from '~/interfaces/contexts/account'
import { LoginParams, RegisterParams } from '@http/routes/account/types'
import { useModal } from '~/hooks/useModal'
import { useTheme } from '~/hooks/useTheme'
import { SuccessCallback } from '~/interfaces/contexts'
import { picker } from '~/utils/picker'
import { useStorage } from '~/hooks/useStorage'
import { http } from '@http/index'

export const AccountContext = createContext({} as AccountContextValues)

export function AccountProvider(props: PropsWithChildren) {
  const modal = useModal()
  const storage = useStorage()
  const { colors } = useTheme()

  const handleShowModalError = useCallback(
    (errorMessage?: string) => {
      modal.open({
        isError: true,
        title: 'Ops! Ocorreu algum erro',
        description: errorMessage,
        icon: <Feather name="alert-circle" color={colors.red[500]} size={50} />,
        buttons: [{ text: 'Ok!', type: 'error', fullWidth: true }],
      })
    },
    [modal, colors.red],
  )

  return (
    <AccountContext.Provider value={{}}>
      {props.children}
    </AccountContext.Provider>
  )
}
