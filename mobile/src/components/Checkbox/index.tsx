import ExpoCheckbox from 'expo-checkbox'
import { View, Text } from 'react-native'

import styles from './styles'
import { useTheme } from '~/hooks/useTheme'

interface CheckboxProps {
  onCheck?: (checked: boolean) => void
  checkboxLabel?: string
  checked?: boolean
}

export function Checkbox(props: CheckboxProps) {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <ExpoCheckbox
        value={Boolean(props.checked)}
        onValueChange={props.onCheck}
        color={props.checked ? colors.purple[300] : ''}
        style={styles[props.checked ? 'checkbox' : 'checkboxPurple']}
      />
      <Text style={styles.text}>{props.checkboxLabel}</Text>
    </View>
  )
}
