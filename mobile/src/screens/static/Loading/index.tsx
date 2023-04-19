import { View, Text, ActivityIndicator } from 'react-native'

import { Layout } from '~/components/Layout'
import { useTheme } from '~/hooks/useTheme'

import styles from './styles'

const { colors } = useTheme()

export function LoadingPage() {
  return (
    <Layout>
      <View style={styles.container}>
        <ActivityIndicator color={colors.purple[500]} />
        <Text style={styles.text}>Carregando...</Text>
      </View>
    </Layout>
  )
}
