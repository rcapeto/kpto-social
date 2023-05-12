import { View, Text } from 'react-native'
import { Octicons } from '@expo/vector-icons'

import { useTheme } from '~/hooks/useTheme'
import { Button } from '~/components/Button'

import styles from './styles'

interface ErrorPageProps {
  errorMessage?: string
  errorTitle?: string
  onPressButton?: () => void
  buttonText?: string
}

export function ErrorPage({
  errorMessage = 'Descrição do erro aqui',
  errorTitle = 'Ops, ocorreu um erro!',
  buttonText = 'Voltar',
  onPressButton,
}: ErrorPageProps) {
  const { colors, fontSize } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{errorTitle}</Text>
      <Octicons
        name="stop"
        color={colors.purple[500]}
        size={fontSize.xl * 10}
      />

      <View style={styles.footer}>
        <Text style={styles.description}>{errorMessage}</Text>

        <Button text={buttonText} onPress={onPressButton} />
      </View>
    </View>
  )
}
