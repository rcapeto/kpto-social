import { Dimensions, StyleSheet, View } from 'react-native'

import { Skeleton } from '~/components/Skeleton'

export function Loader() {
  const fullWidth = Dimensions.get('window').width - 40

  return (
    <View style={styles.container}>
      <Skeleton
        width={fullWidth * 0.6}
        height={25}
        style={{ borderRadius: 4, marginBottom: 15 }}
      />
      <Skeleton
        width={fullWidth * 0.4}
        height={10}
        style={{ borderRadius: 2, marginBottom: 8 }}
      />

      <Skeleton
        width={fullWidth * 0.3}
        height={10}
        style={{ borderRadius: 2 }}
      />

      <Skeleton
        width={fullWidth}
        height={400}
        style={{ borderRadius: 8, marginTop: 30 }}
      />

      <Skeleton
        width={fullWidth}
        height={10}
        style={{ borderRadius: 2, marginTop: 20 }}
      />
      <Skeleton
        width={fullWidth}
        height={10}
        style={{ borderRadius: 2, marginTop: 20 }}
      />
      <Skeleton
        width={fullWidth}
        height={10}
        style={{ borderRadius: 2, marginTop: 20 }}
      />
      <Skeleton
        width={fullWidth * 0.8}
        height={10}
        style={{ borderRadius: 2, marginTop: 20 }}
      />
      <Skeleton
        width={fullWidth * 0.6}
        height={10}
        style={{ borderRadius: 2, marginTop: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
