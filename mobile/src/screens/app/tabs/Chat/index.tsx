import { View, Text } from 'react-native'

import { Layout } from '~/components/Layout'
import styles from './styles'

const title = 'Conversas'

export function Chat() {
  return (
    <Layout headerProps={{ title }} activeHeader contentWithPadding>
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Chat</Text>
      </View>
    </Layout>
  )
}
