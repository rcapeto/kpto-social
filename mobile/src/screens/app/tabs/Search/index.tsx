import { View, Text } from 'react-native'

import { Layout } from '~/components/Layout'
import styles from './styles'

const title = 'Buscar'

export function Search() {
  return (
    <Layout headerProps={{ title }} activeHeader contentWithPadding>
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Search</Text>
      </View>
    </Layout>
  )
}
