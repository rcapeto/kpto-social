import { useContext } from 'react'
import { AccountContext } from '~/contexts/account'

export function useAccount() {
  return useContext(AccountContext)
}
