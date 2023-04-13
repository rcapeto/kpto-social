import { EventManager } from '@events/event-manager'
import { loginListeners } from '@contexts/events/listeners/authentication/login'

export function startListeners(eventManager: EventManager) {
  const listeners = [loginListeners]

  for (const listener of listeners) {
    listener(eventManager)
  }
}
