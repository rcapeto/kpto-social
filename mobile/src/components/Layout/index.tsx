import React, { useMemo, Fragment, PropsWithChildren } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native'

import { useTheme } from '~/hooks/useTheme'
import { type HeaderProps, Header } from '~/components/Header'
import { RenderValidation } from '~/components/RenderValidation'

import styles from './styles'

export interface LayoutProps extends PropsWithChildren {
  activeHeader?: boolean
  headerProps?: HeaderProps
  contentWithPadding?: boolean
}

export function Layout({
  children,
  activeHeader = false,
  headerProps = {},
  contentWithPadding = false,
}: LayoutProps) {
  const { isAndroid } = useTheme()

  const containerStyles = useMemo(() => {
    const style: StyleProp<ViewStyle>[] = [styles.container]

    if (!activeHeader) {
      style.push(styles.withNotHeader)
    }

    return style
  }, [activeHeader])

  const contentStyles = useMemo(() => {
    const style: StyleProp<ViewStyle>[] = [styles.content]

    if (contentWithPadding) {
      style.push(styles.padding)
    }

    return style
  }, [contentWithPadding])

  return (
    <KeyboardAvoidingView
      behavior={isAndroid ? 'height' : 'padding'}
      style={styles.flexOne}>
      <View style={containerStyles}>
        <RenderValidation
          validation={activeHeader}
          validComponent={<Header {...headerProps} />}
        />

        <View style={contentStyles}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Fragment>{children}</Fragment>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
