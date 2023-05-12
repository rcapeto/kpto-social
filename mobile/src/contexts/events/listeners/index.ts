import { EventManager } from '@events/event-manager'

import { authenticationListeners } from '~/contexts/events/listeners/authentication'
import { modalListeners } from '~/contexts/events/listeners/components/modal'
import { postsListeners } from '~/contexts/events/listeners/entities/posts'
import { errorsListeners } from '~/contexts/events/listeners/errors'

export function startListeners(eventManager: EventManager) {
  const listeners = [
    errorsListeners,
    authenticationListeners,
    modalListeners,
    postsListeners,
  ]

  for (const listener of listeners) {
    listener(eventManager)
  }
}
