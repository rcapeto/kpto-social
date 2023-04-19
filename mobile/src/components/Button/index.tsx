import { Fragment, ReactElement, ReactNode, useCallback, useMemo } from 'react'
import {
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
} from 'react-native'

import { RenderValidation } from '~/components/RenderValidation'
import styles from './styles'
import { useTheme } from '~/hooks/useTheme'

type NativeProps = Omit<TouchableOpacityProps, 'onPress' | 'disabled'>
export type ButtonType = 'success' | 'error' | 'info' | 'default'
export type ButtonVariation = 'default' | 'outlined'

export interface ButtonProps {
  nativeProps?: NativeProps
  text: string
  onPress?: () => void
  fullWidth?: boolean
  type?: ButtonType
  containerStyle?: StyleProp<ViewStyle>
  leftIcon?: ReactElement | ReactNode
  rightIcon?: ReactElement | ReactNode
  disabled?: boolean
  isLoading?: boolean
  variation?: ButtonVariation
}

const { colors } = useTheme()

export function Button({
  text,
  fullWidth,
  nativeProps,
  type = 'default',
  containerStyle,
  leftIcon,
  rightIcon,
  disabled,
  isLoading,
  variation = 'default',
  onPress,
}: ButtonProps) {
  const buttonStyle = useMemo(() => {
    const style: StyleProp<ViewStyle>[] = [styles.button, containerStyle]

    if (fullWidth) {
      style.push(styles.fullWidth)
    }

    style.push(styles[type])

    if (disabled) {
      style.push(styles.disabled)
    }

    if (variation === 'outlined') {
      style.push(styles.outlined)
      style.push(styles[`${type}Border`])

      if (isLoading) {
        style.push(styles.noBorder)
      }
    }

    return style
  }, [type, fullWidth, containerStyle, disabled, variation, isLoading])

  const textStyles = useMemo(() => {
    const style: StyleProp<TextStyle>[] = [styles.buttonText]

    if (variation === 'outlined') {
      style.push(styles[`${type}TextColor`])
    }

    return style
  }, [variation, type])

  const onPressButton = useCallback(() => {
    if (!isLoading) {
      onPress?.()
    }
  }, [isLoading, onPress])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressButton}
        {...nativeProps}
        style={buttonStyle}
        disabled={disabled || isLoading}>
        <RenderValidation
          validation={Boolean(isLoading)}
          validComponent={<ActivityIndicator color={colors.white} />}
          unvalidComponent={
            <Fragment>
              <RenderValidation
                validation={Boolean(leftIcon)}
                validComponent={
                  <View style={[styles.iconContainer, styles.iconLeft]}>
                    {leftIcon}
                  </View>
                }
              />

              <Text style={textStyles}>{text}</Text>

              <RenderValidation
                validation={Boolean(rightIcon)}
                validComponent={
                  <View style={[styles.iconContainer, styles.iconRight]}>
                    {rightIcon}
                  </View>
                }
              />
            </Fragment>
          }
        />
      </TouchableOpacity>
    </View>
  )
}
