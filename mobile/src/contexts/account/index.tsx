import { PropsWithChildren, createContext, useCallback, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'

import { AccountContextValues } from '~/interfaces/contexts/account'
import {
  LoginParams,
  MeParams,
  RegisterParams,
} from '@http/routes/account/types'
import { useModal } from '~/hooks/useModal'
import { useTheme } from '~/hooks/useTheme'
import { SuccessCallback } from '~/interfaces/contexts'
import { picker } from '~/utils/picker'
import { useStorage } from '~/hooks/useStorage'
import { http } from '@http/index'
import { useAccountReducer } from '~/reducers/account'
import { MeDeveloper } from '~/interfaces/entity/developer'
import { manipulateHeaderAPI } from '~/services/api'
import { Status } from '@http/enums/status'

export const AccountContext = createContext({} as AccountContextValues)

export function AccountProvider(props: PropsWithChildren) {
  const modal = useModal()
  const storage = useStorage()
  const { colors } = useTheme()
  const [state, dispatch] = useAccountReducer()

  function dispatchLoading() {
    dispatch({ type: 'TOGGLE_REQUEST' })
  }

  async function login(params: LoginParams, successCallback?: SuccessCallback) {
    const errorCallback = modal.handleShowModalError

    const response = await http.getAccountRoutes().login(params, {
      errorCallback,
      dispatchLoading,
    })

    if (
      response &&
      picker(response, 'data') &&
      picker(response.data, 'token')
    ) {
      const token = picker(response.data, 'token') as string

      if (token) {
        await checkDeveloper({ token })
        successCallback?.()
      }
    }
  }

  const logout = useCallback(() => {
    storage.removeItem('token')
    dispatch({ type: 'UPDATE_DEVELOPER', payload: { developer: null } })
  }, [storage, dispatch])

  const checkDeveloper = useCallback(
    async (params: MeParams) => {
      const errorCallback = modal.handleShowModalError
      const { token } = Object.assign({ token: '' }, params)
      const query = { token }

      const response = await http.getAccountRoutes().me(query, {
        errorCallback,
        unauthorizedCallback: logout,
      })

      if (
        response &&
        picker(response, 'data') &&
        picker(response.data, 'developer')
      ) {
        const developer = picker(response.data, 'developer') as MeDeveloper

        manipulateHeaderAPI('Authorization', `Bearer ${token}`)
        storage.insertNewValue('token', token)
        dispatch({ type: 'UPDATE_DEVELOPER', payload: { developer } })
      }
    },
    [dispatch, storage, modal, logout],
  )

  async function register(
    params: RegisterParams,
    successCallback?: SuccessCallback,
  ) {
    const errorCallback = modal.handleShowModalError

    const response = await http.getAccountRoutes().register(params, {
      dispatchLoading,
      errorCallback,
    })

    if (response && picker(response, 'status')) {
      const status = picker(response, 'status') as number

      if (status === Status.CREATED) {
        successCallback?.()
      }
    }
  }

  useEffect(() => {
    storage
      .getAsync('token')
      .then(async (token) => {
        dispatch({ type: 'TOGGLE_CHECK_LOGGED' })
        if (token) {
          await checkDeveloper({ token })
        }
      })
      .finally(() => {
        dispatch({ type: 'TOGGLE_CHECK_LOGGED' })
      })
  }, [checkDeveloper, dispatch, storage])

  return (
    <AccountContext.Provider
      value={{
        ...state,
        logout,
        login,
        register,
        checkDeveloper,
        isLogged: !!state.developer,
      }}>
      {props.children}
    </AccountContext.Provider>
  )
}
