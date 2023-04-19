import { MeDeveloper } from '~/interfaces/entity/developer'

export interface AccountReducerState {
  developer: MeDeveloper | null
  isRequesting: boolean
  checkIsLogged: boolean
}

export type AccountReducerAction =
  | { type: 'TOGGLE_REQUEST' }
  | { type: 'TOGGLE_CHECK_LOGGED' }
  | { type: 'UPDATE_DEVELOPER'; payload: { developer: MeDeveloper | null } }
