import { useCallback, useMemo } from 'react'
import { View, Text, StyleProp, TextStyle } from 'react-native'

import { Mapper } from '~/components/Mapper'
import { checkAllPasswordsType } from '~/utils/validations/checkPassword'
import styles from './styles'

interface HelpPasswordProps {
  text: string
}

export function HelpPassword(props: HelpPasswordProps) {
  const data = useMemo(() => checkAllPasswordsType(props.text), [props.text])

  const textStyle = useCallback(
    (isValid: boolean) => {
      const style: StyleProp<TextStyle>[] = [styles.text]
      const isEmpty = !props.text

      if (isEmpty) {
        style.push(styles.empty)
      } else {
        style.push(isValid ? styles.success : styles.error)
      }

      return style
    },
    [props.text],
  )

  return (
    <View style={styles.container}>
      <Text style={styles.helpText}>
        Para sua segurança siga essas regrinhas abaixo:
      </Text>
      <Mapper
        items={data.validations}
        keyExtractor={(item) => item.message}
        renderItem={({ item: { isValid, message } }) => (
          <View style={styles.textContainer}>
            <Text style={textStyle(isValid)}>{message}</Text>
          </View>
        )}
      />
    </View>
  )
}
