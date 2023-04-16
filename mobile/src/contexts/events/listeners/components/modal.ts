import { EventsAccountEnum } from '@events/enums/modal'
import { EventManager } from '@events/event-manager'

export function modalListeners(eventManager: EventManager) {
  eventManager.on(EventsAccountEnum.ON_OPEN, (params) => {
    console.log('Modal opened >>>>', { params })
  })
  eventManager.on(EventsAccountEnum.ON_CLOSE, (params) => {
    console.log('Modal closed >>>>', { params })
  })
}
