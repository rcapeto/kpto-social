import { ModalState } from '~/components/Modal'
import { EventManagerCallbackParams } from '@events/types'

export interface ModalContextValues {
  open: (config: ModalState, eventParams?: EventManagerCallbackParams) => void
  close: (eventParams?: EventManagerCallbackParams) => void
}
