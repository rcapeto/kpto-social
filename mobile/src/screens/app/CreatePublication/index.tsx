import { View, Text } from 'react-native'

import { Layout } from '~/components/Layout'
import styles from './styles'

const title = 'Publicar'

export function CreatePublication() {
  return (
    <Layout headerProps={{ title }} activeHeader contentWithPadding>
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>CreatePublication</Text>
      </View>
    </Layout>
  )
}
