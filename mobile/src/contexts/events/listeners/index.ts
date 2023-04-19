import { EventManager } from '@events/event-manager'

import { authenticationListeners } from '~/contexts/events/listeners/authentication'
import { modalListeners } from '~/contexts/events/listeners/components/modal'

export function startListeners(eventManager: EventManager) {
  const listeners = [authenticationListeners, modalListeners]

  for (const listener of listeners) {
    listener(eventManager)
  }
}
