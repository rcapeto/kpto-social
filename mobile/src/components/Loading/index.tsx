import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useTheme } from '~/hooks/useTheme'

const { colors } = useTheme()

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.purple[300]} />
    </View>
  )
}
