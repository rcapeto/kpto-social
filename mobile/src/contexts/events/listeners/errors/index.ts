import { EventsErrorEnum } from '@events/enums/errors'
import { EventManager } from '@events/event-manager'

const str = (sufix: string) => `Dispatch [ERROR]:[${sufix}] >>>`

export function errorsListeners(eventManager: EventManager) {
  eventManager.on(EventsErrorEnum.REQUEST, (params) => {
    console.log(str('Request'), { params })
  })
}
