import { EventManager } from '@events/event-manager'

import { loginListeners } from '~/contexts/events/listeners/authentication/login'
import { modalListeners } from '~/contexts/events/listeners/components/modal'

export function startListeners(eventManager: EventManager) {
  const listeners = [loginListeners, modalListeners]

  for (const listener of listeners) {
    listener(eventManager)
  }
}
