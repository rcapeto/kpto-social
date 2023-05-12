import { EventsAccountEnum } from '@events/enums/modal'
import { EventManager } from '@events/event-manager'

const str = (sufix: string) => `Dispatch [MODAL]:[${sufix}] >>>`

export function modalListeners(eventManager: EventManager) {
  eventManager.on(EventsAccountEnum.ON_OPEN, (params) => {
    console.log(str('Open'), { params })
  })
  eventManager.on(EventsAccountEnum.ON_CLOSE, (params) => {
    console.log(str('Close'), { params })
  })
}
