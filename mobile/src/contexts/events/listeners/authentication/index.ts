import { EventsAccountEnum } from '@events/enums/account'
import { EventManager } from '@events/event-manager'

export function authenticationListeners(eventManager: EventManager) {
  eventManager.on(EventsAccountEnum.LOGIN, (params) => {
    console.log('disparou aqui', { params })
  })
}
