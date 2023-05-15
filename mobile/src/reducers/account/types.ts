import { MeDeveloper } from '~/interfaces/entity/developer'

export interface AccountReducerState {
  developer: MeDeveloper | null
  isRequesting: boolean
  checkIsLogged: boolean
}

export type AccountReducerAction =
  | { type: AccountReducerType.REQUEST }
  | { type: AccountReducerType.CHECK_LOGGED }
  | {
      type: AccountReducerType.UPDATE_DEVELOPER
      payload: { developer: MeDeveloper | null }
    }

export enum AccountReducerType {
  REQUEST = 'TOGGLE_REQUEST',
  CHECK_LOGGED = 'TOGGLE_CHECK_LOGGED',
  UPDATE_DEVELOPER = 'UPDATE_DEVELOPER',
}
