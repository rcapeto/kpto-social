import { Image, View, Text } from 'react-native'
import moment from 'moment'

import { FindOnePostComment } from '~/interfaces/entity/comment'
import { appConfig } from '~/config/app'
import { getImage } from '~/utils/getImage'

import styles from './styles'

moment.locale(appConfig.locale)

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

        <Text style={styles.commentDate}>
          {moment(comment.createdAt).format('DD/MM/YYYY')}
        </Text>
      </View>

      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  )
}
