import { View, Text } from 'react-native'

import { Layout } from '~/components/Layout'
import styles from './styles'

const title = 'Perfil'

export function Profile() {
  return (
    <Layout headerProps={{ title }} activeHeader contentWithPadding>
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Profile</Text>
      </View>
    </Layout>
  )
}
