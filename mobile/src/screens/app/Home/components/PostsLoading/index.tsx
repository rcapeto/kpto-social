import { View, Dimensions } from 'react-native'

import { Skeleton } from '~/components/Skeleton'

import styles from './styles'
import { Mapper } from '~/components/Mapper'

export function PostsLoading() {
  return (
    <Mapper
      items={Array.from({ length: 3 }).map((_) => Math.random().toString())}
      keyExtractor={(item) => item}
      renderItem={() => <Loader />}
    />
  )
}

function Loader() {
  // 40 => 40px de padding = 20px L e D
  const cardWidth = Dimensions.get('window').width - 40

  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Skeleton width={40} height={40} style={{ borderRadius: 20 }} />

        <View style={styles.authorContent}>
          <Skeleton width={110} height={10} style={{ borderRadius: 2 }} />

          <View style={styles.techs}>
            <Skeleton
              width={40}
              height={10}
              style={{ borderRadius: 2, marginTop: 6, marginRight: 5 }}
            />
            <Skeleton
              width={40}
              height={10}
              style={{ borderRadius: 2, marginTop: 6, marginRight: 5 }}
            />
            <Skeleton
              width={40}
              height={10}
              style={{ borderRadius: 2, marginTop: 6 }}
            />
          </View>
        </View>
      </View>

      <View style={styles.postContainer}>
        <Skeleton width={150} height={20} style={{ borderRadius: 5 }} />

        <View style={styles.image}>
          <Skeleton
            width={cardWidth}
            height={120}
            style={{ borderRadius: 8 }}
          />
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.actionContainer}>
            <Skeleton
              width={35}
              height={15}
              style={{ marginRight: 10, borderRadius: 4 }}
            />

            <Skeleton width={35} height={15} style={{ borderRadius: 4 }} />
          </View>

          <Skeleton
            width={100}
            height={15}
            style={{ marginRight: 10, borderRadius: 4 }}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Skeleton
            width={cardWidth / 2}
            height={15}
            style={{ marginRight: 10, borderRadius: 4 }}
          />
        </View>
      </View>
    </View>
  )
}
