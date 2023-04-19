import {
  LoginParams,
  MeParams,
  RegisterParams,
} from '@http/routes/account/types'
import { SuccessCallback } from '~/interfaces/contexts'
import { AccountReducerState } from '~/reducers/account/types'

export interface AccountContextValues extends AccountReducerState {
  logout: () => void
  login: (
    params: LoginParams,
    successCallback?: SuccessCallback,
  ) => Promise<void>
  checkDeveloper: (params: MeParams) => Promise<void>
  isLogged: boolean
  register: (
    params: RegisterParams,
    successCallback?: SuccessCallback,
  ) => Promise<void>
}
