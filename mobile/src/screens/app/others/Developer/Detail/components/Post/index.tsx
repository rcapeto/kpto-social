import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { FindOneDeveloperPost } from '~/interfaces/entity/developer'
import { appConfig } from '~/config/app'
import { getImage } from '~/utils/getImage'
import { useTheme } from '~/hooks/useTheme'

import styles from './styles'

interface PostProps {
  post: FindOneDeveloperPost
}

const { colors, fontSize } = useTheme()

export function Post({ post }: PostProps) {
  const navigation = useNavigation()

  function handleNavigatePostDetail() {
    if (post.id) {
      navigation.navigate('postDetail', {
        postId: post.id,
      })
    }
  }

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={handleNavigatePostDetail}>
      <View style={styles.imageContainer}>
        <Image
          source={getImage(post.thumbnail, appConfig.emptyThumbnail)}
          alt={post.title}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.title}>{post.title}</Text>

        <View style={styles.actions}>
          <View style={styles.action}>
            <Feather name="heart" size={fontSize.sm} color={colors.gray[200]} />
            <Text style={styles.actionText}>{post.likes} curtidas</Text>
          </View>

          <View style={styles.action}>
            <Feather
              name="message-circle"
              size={fontSize.sm}
              color={colors.gray[200]}
            />
            <Text style={styles.actionText}>{post.comments} comentários</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
