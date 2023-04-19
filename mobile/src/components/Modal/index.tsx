import {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  FunctionComponent,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  Modal as NativeModal,
  View,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native'

import { ButtonProps, Button } from '~/components/Button'
import { Mapper } from '~/components/Mapper'
import {
  RenderValidation,
  checkValidation,
} from '~/components/RenderValidation'

import { EventManagerCallbackParams } from '@events/types'
import { EventsAccountEnum } from '@events/enums/modal'
import styles from './styles'
import { useEvents } from '~/hooks/useEvents'

export type ModalType = 'fade' | 'slide'

export interface ModalState {
  Component?: FunctionComponent<{}>
  passProps?: Record<string, any>
  type?: ModalType
  description?: string
  title?: string
  icon?: ReactNode
  buttons?: ButtonProps[]
  isError?: boolean
  isSuccess?: boolean
}

export interface ModalActions {
  openModal: (
    config: ModalState,
    eventParams?: EventManagerCallbackParams,
  ) => void
  closeModal: (eventParams?: EventManagerCallbackParams) => void
}

const Modal: ForwardRefRenderFunction<ModalActions> = (_, ref) => {
  const { eventManager } = useEvents()
  const [visible, setVisible] = useState(false)
  const [modalState, setModalState] = useState<ModalState>({ type: 'fade' })

  function handleOpenModal(
    config: ModalState,
    eventParams?: EventManagerCallbackParams,
  ) {
    const defaultState: ModalState = { type: 'fade' }

    setVisible(true)
    setModalState(Object.assign(defaultState, config))

    eventManager.emmit(EventsAccountEnum.ON_OPEN, eventParams)
  }

  function handleCloseModal(eventParams?: EventManagerCallbackParams) {
    setVisible(false)
    setModalState({})
    eventManager.emmit(EventsAccountEnum.ON_CLOSE, eventParams)
  }

  useImperativeHandle(ref, () => {
    return {
      openModal: handleOpenModal,
      closeModal: handleCloseModal,
    }
  })

  const containerStyle = useMemo(() => {
    const isFadeAnimation = modalState?.type === 'fade'
    return isFadeAnimation ? styles.fadeContainer : styles.slideContainer
  }, [modalState])

  const contentStyle = useMemo(() => {
    const isFadeAnimation = modalState?.type === 'fade'

    return isFadeAnimation ? styles.fadeContent : styles.slideContent
  }, [modalState])

  const Component = useMemo(() => {
    return modalState?.Component
  }, [modalState])

  const getTextStyle = useCallback(
    (initialValue: StyleProp<TextStyle>) => {
      const style: StyleProp<TextStyle>[] = [initialValue]

      if (modalState?.isSuccess) {
        style.push(styles.success)
      }

      if (modalState?.isError) {
        style.push(styles.error)
      }

      return style
    },
    [modalState],
  )

  return (
    <NativeModal
      transparent
      animationType={modalState?.type ?? 'slide'}
      visible={visible}
      collapsable>
      <View style={containerStyle}>
        <View style={contentStyle}>
          <RenderValidation
            validation={checkValidation(Component)}
            validComponent={
              <Fragment>
                {Component && <Component {...(modalState?.passProps ?? {})} />}
              </Fragment>
            }
            unvalidComponent={
              <Fragment>
                <RenderValidation
                  validation={checkValidation(modalState?.icon)}
                  validComponent={
                    <View style={styles.iconContainer}>{modalState?.icon}</View>
                  }
                />
                <RenderValidation
                  validation={checkValidation(modalState?.title)}
                  validComponent={
                    <View style={styles.titleContainer}>
                      <Text style={getTextStyle(styles.title)}>
                        {modalState?.title}
                      </Text>
                    </View>
                  }
                />
                <RenderValidation
                  validation={checkValidation(modalState?.description)}
                  validComponent={
                    <View style={styles.descriptionContainer}>
                      <Text style={getTextStyle(styles.description)}>
                        {modalState?.description}
                      </Text>
                    </View>
                  }
                />
                <RenderValidation
                  validation={checkValidation(modalState?.buttons)}
                  validComponent={
                    <View style={styles.buttonsContainer}>
                      <Mapper
                        items={modalState?.buttons ?? []}
                        keyExtractor={(item) => item.text}
                        renderItem={({ item: { onPress, ...button } }) => (
                          <Button
                            {...button}
                            onPress={() => {
                              handleCloseModal()
                              onPress?.()
                            }}
                          />
                        )}
                      />
                    </View>
                  }
                />
              </Fragment>
            }
          />
        </View>
      </View>
    </NativeModal>
  )
}

export default forwardRef(Modal)
