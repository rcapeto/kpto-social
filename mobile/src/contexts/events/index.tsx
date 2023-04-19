import React, { createContext, PropsWithChildren } from 'react'

import { EventContextValues } from '~/contexts/events/types'
import { EventManager } from '@events/event-manager'
import { startListeners } from '~/contexts/events/listeners'

export const EventContext = createContext({} as EventContextValues)

export function EventContextProvider({ children }: PropsWithChildren) {
  const eventManager = EventManager.getInstance()

  startListeners(eventManager)

  return (
    <EventContext.Provider value={{ eventManager }}>
      {children}
    </EventContext.Provider>
  )
}
