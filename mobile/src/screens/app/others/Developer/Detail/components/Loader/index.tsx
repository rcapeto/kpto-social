import { Fragment } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import { Mapper } from '~/components/Mapper'
import { Skeleton } from '~/components/Skeleton'

export function Loader() {
  const width = Dimensions.get('window').width - 40

  return (
    <View style={styles.container}>
      <Skeleton width={200} height={30} style={{ borderRadius: 8 }} />
      <Skeleton
        width={80}
        height={80}
        style={{ borderRadius: 40, marginTop: 20 }}
      />

      <Skeleton
        width={170}
        height={20}
        style={{ borderRadius: 6, marginVertical: 20 }}
      />

      <Mapper
        items={Array.from({ length: 6 })}
        keyExtractor={(item) => `${Math.random()}-${item}`}
        renderItem={() => (
          <Fragment>
            <Skeleton
              width={120}
              height={20}
              style={{ borderRadius: 6, marginVertical: 20 }}
            />

            <Skeleton
              width={width - 40}
              height={20}
              style={{ borderRadius: 6, marginBottom: 20 }}
            />
          </Fragment>
        )}
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
