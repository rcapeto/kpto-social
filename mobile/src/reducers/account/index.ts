import { useReducer } from 'react'
import {
  AccountReducerAction,
  AccountReducerState,
} from '~/reducers/account/types'

const initialState: AccountReducerState = {
  checkIsLogged: false,
  developer: null,
  isRequesting: false,
}

function dispatch(state: AccountReducerState, action: AccountReducerAction) {
  switch (action.type) {
    case 'TOGGLE_CHECK_LOGGED':
      return {
        ...state,
        checkIsLogged: !state.checkIsLogged,
      }
    case 'TOGGLE_REQUEST':
      return {
        ...state,
        isRequesting: !state.isRequesting,
      }
    case 'UPDATE_DEVELOPER':
      return {
        ...state,
        developer: action.payload.developer,
      }
    default:
      return state
  }
}

export function useAccountReducer() {
  return useReducer(dispatch, initialState)
}
