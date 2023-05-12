import { Image, View, Text } from 'react-native'

import { FindOnePostComment } from '~/interfaces/entity/comment'
import { appConfig } from '~/config/app'
import { getImage } from '~/utils/getImage'
import { formatDate } from '~/utils/formatDate'

import styles from './styles'

interface CommentProps {
  comment: FindOnePostComment
}

export function Comment({ comment }: CommentProps) {
  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <View style={styles.commentAuthorContainer}>
          <Image
            source={getImage(comment.author.avatar_url, appConfig.emptyImage)}
            alt={comment.author.name}
            style={styles.commentAuthorImage}
          />

          <Text
            style={styles.commentAuthorName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {comment.author.name}
          </Text>
        </View>

        <Text style={styles.commentDate}>{formatDate(comment.createdAt)}</Text>
      </View>

      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  )
}
