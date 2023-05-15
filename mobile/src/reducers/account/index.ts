import { useReducer } from 'react'
import {
  AccountReducerAction,
  AccountReducerState,
  AccountReducerType,
} from '~/reducers/account/types'

const initialState: AccountReducerState = {
  checkIsLogged: false,
  developer: null,
  isRequesting: false,
}

function dispatch(state: AccountReducerState, action: AccountReducerAction) {
  switch (action.type) {
    case AccountReducerType.CHECK_LOGGED:
      return {
        ...state,
        checkIsLogged: !state.checkIsLogged,
      }
    case AccountReducerType.REQUEST:
      return {
        ...state,
        isRequesting: !state.isRequesting,
      }
    case AccountReducerType.UPDATE_DEVELOPER:
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
