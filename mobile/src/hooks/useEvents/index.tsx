import { useContext } from 'react'
import { EventContext } from '@contexts/events'

export function useEvents() {
  return useContext(EventContext)
}
