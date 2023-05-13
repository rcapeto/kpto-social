import { EventsDeveloperEnum } from '@events/enums/developers'
import { EventManager } from '@events/event-manager'

const str = (sufix: string) => `Dispatch [DEVELOPER]:[${sufix}] >>>`

export function developersListeners(eventManager: EventManager) {
  eventManager.on(EventsDeveloperEnum.DELETE, (params) => {
    console.log(str('Create'), { params })
  })
}
