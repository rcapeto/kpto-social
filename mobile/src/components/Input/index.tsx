import { ReactElement, useState } from 'react'
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { RenderValidation } from '~/components/RenderValidation'
import { useTheme } from '~/hooks/useTheme'

import styles from './styles'

type NativeProps = Omit<
  TextInputProps,
  | 'value'
  | 'onChangeText'
  | 'onChange'
  | 'secureTextEntry'
  | 'placeholder'
  | 'keyboardAppearance'
  | 'id'
>

export interface InputProps {
  onChangeText?: (text: string) => void
  value?: string
  errorMessage?: string
  label?: string
  isPassword?: boolean
  iconLeft?: ReactElement
  placeholder?: string
  inputProps?: NativeProps
  required?: boolean
  name: string
}

const { colors, fontSize } = useTheme()

export function Input({
  onChangeText,
  value,
  errorMessage,
  label,
  iconLeft,
  isPassword = false,
  placeholder,
  inputProps,
  required,
  name,
}: InputProps) {
  const [hideValue, setHideValue] = useState(isPassword)

  function toggleShowInputValue() {
    setHideValue((prevValue) => !prevValue)
  }

  return (
    <View style={styles.container}>
      <RenderValidation
        validation={Boolean(label)}
        validComponent={
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>
              {label}
              <RenderValidation
                validation={Boolean(required)}
                validComponent={<Text style={styles.requiredText}>*</Text>}
              />
            </Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <RenderValidation
          validation={Boolean(iconLeft)}
          validComponent={<View style={styles.iconContainer}>{iconLeft}</View>}
        />

        <TextInput
          style={styles.input}
          {...inputProps}
          id={name}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[300]}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={hideValue}
          keyboardAppearance="dark"
        />

        <RenderValidation
          validation={Boolean(isPassword)}
          validComponent={
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={toggleShowInputValue}>
              <Feather
                name={hideValue ? 'eye' : 'eye-off'}
                color={colors.white}
                size={fontSize.lg}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <RenderValidation
        validation={Boolean(errorMessage)}
        validComponent={
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        }
      />
    </View>
  )
}
