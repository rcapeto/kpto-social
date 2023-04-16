import { PropsWithChildren, createContext, useRef } from 'react'

import Modal, { ModalActions, ModalState } from '~/components/Modal'
import { ModalContextValues } from '~/interfaces/contexts/modal'
import { EventManagerCallbackParams } from '@events/types'

export const ModalContext = createContext({} as ModalContextValues)

export function ModalProvider(props: PropsWithChildren) {
  const modalRef = useRef<ModalActions>(null)

  function open(config: ModalState, eventParams?: EventManagerCallbackParams) {
    const modal = modalRef.current
    modal?.openModal(config, eventParams)
  }

  function close(eventParams?: EventManagerCallbackParams) {
    const modal = modalRef.current
    modal?.closeModal(eventParams)
  }

  return (
    <ModalContext.Provider value={{ close, open }}>
      {props.children}
      <Modal ref={modalRef} />
    </ModalContext.Provider>
  )
}
