import React, { createContext } from 'react'
import { ComponentWithChildren } from '@interfaces/children'

import { EventContextValues } from '@contexts/events/types'
import { EventManager } from '@events/event-manager'
import { startListeners } from '@contexts/events/listeners'

export const EventContext = createContext({} as EventContextValues)

export function EventContextProvider({ children }: ComponentWithChildren) {
  const eventManager = EventManager.getInstance()

  startListeners(eventManager)

  return (
    <EventContext.Provider value={{ eventManager }}>
      {children}
    </EventContext.Provider>
  )
}
