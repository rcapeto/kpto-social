import { PropsWithChildren, createContext, useCallback, useEffect } from 'react'

import { AccountContextValues } from '~/interfaces/contexts/account'
import {
  LoginParams,
  MeParams,
  RegisterParams,
} from '@http/routes/account/types'
import { useModal } from '~/hooks/useModal'
import { SuccessCallback } from '~/interfaces/contexts'
import { picker } from '~/utils/picker'
import { useStorage } from '~/hooks/useStorage'
import { http } from '@http/index'
import { useAccountReducer } from '~/reducers/account'
import { MeDeveloper } from '~/interfaces/entity/developer'
import { manipulateHeaderAPI } from '~/services/api'
import { Status } from '@http/enums/status'
import { EventsAccountEnum } from '@events/enums/account'
import { EventType } from '@events/types'
import { useEvents } from '~/hooks/useEvents'
import { createEventName } from '@events/utils/createEventName'
import { paths } from '~/routes/config/paths'

export const AccountContext = createContext({} as AccountContextValues)

export function AccountProvider(props: PropsWithChildren) {
  const modal = useModal()
  const storage = useStorage()
  const [state, dispatch] = useAccountReducer()
  const { eventManager } = useEvents()

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
        await checkDeveloper({ token }, successCallback)
      }
    }
  }

  const logout = useCallback(() => {
    storage.removeItem('token')
    dispatch({ type: 'UPDATE_DEVELOPER', payload: { developer: null } })
  }, [storage, dispatch])

  const checkDeveloper = useCallback(
    async (params: MeParams, successCallback?: SuccessCallback) => {
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

        eventManager.emmit(EventsAccountEnum.LOGIN, {
          eventName: createEventName('Login account'),
          eventType: EventType.INTERACTION,
          eventScreenId: paths.authentication.login,
          eventValue: params,
        })

        successCallback?.()
      }
    },
    [dispatch, storage, modal, logout, eventManager],
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
        eventManager.emmit(EventsAccountEnum.REGISTER, {
          eventName: createEventName('Create account'),
          eventType: EventType.INTERACTION,
          eventScreenId: paths.authentication.register,
          eventValue: Object.assign(params, {
            password: '',
            confirm_password: '',
          }),
        })
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
