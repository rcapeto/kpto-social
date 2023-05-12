import { EventsPostsEnum } from '@events/enums/posts'
import { EventManager } from '@events/event-manager'

const str = (sufix: string) => `Dispatch [POSTS]:[${sufix}] >>>`

export function postsListeners(eventManager: EventManager) {
  eventManager.on(EventsPostsEnum.CREATE, (params) => {
    console.log(str('Create'), { params })
  })
}
