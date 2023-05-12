import { EventsAccountEnum } from '@events/enums/account'
import { EventManager } from '@events/event-manager'

const str = (sufix: string) => `Dispatch [AUTH]:[${sufix}] >>>`

export function authenticationListeners(eventManager: EventManager) {
  eventManager.on(EventsAccountEnum.LOGIN, (params) => {
    console.log(str('Login'), { params })
  })
  eventManager.on(EventsAccountEnum.REGISTER, (params) => {
    console.log(str('Register'), { params })
  })
}
