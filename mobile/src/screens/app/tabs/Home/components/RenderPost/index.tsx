import { useState, useCallback } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { FindManyPost } from '~/interfaces/entity/posts'
import { getImage } from '~/utils/getImage'
import { appConfig } from '~/config/app'

import { RenderValidation } from '~/components/RenderValidation'
import { Mapper } from '~/components/Mapper'
import { useTheme } from '~/hooks/useTheme'
import { Button } from '~/components/Button'

import styles from './styles'
import { formatDate } from '~/utils/formatDate'

interface Props {
  post: FindManyPost
}

const { colors, fontSize } = useTheme()

export function RenderPost({ post }: Props) {
  const navigation = useNavigation()

  const [liked, setLiked] = useState(false)

  const handleNavigatePostDetail = useCallback(() => {
    navigation.navigate('postDetail', { postId: post.id })
  }, [post.id, navigation])

  const handleNavigateComments = useCallback(() => {
    console.log('navigate to screen [comments]', post.id)
  }, [post.id])

  const toggleLike = useCallback(() => {
    setLiked((prevState) => !prevState)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Image
          style={styles.authorImage}
          source={getImage(post.author.avatar_url, appConfig.emptyImage)}
          alt={`Foto do ${post.author.name}`}
        />
        <View style={styles.authorContent}>
          <Text
            style={styles.authorName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {post.author.name}
          </Text>

          <RenderValidation
            validation={post.author.techs.length > 0}
            validComponent={
              <View style={styles.authorTechContainer}>
                <Mapper
                  items={post.author.techs.split(',')}
                  keyExtractor={(tech) => `${tech}-${Math.random()}`}
                  renderItem={({ item: tech }) => (
                    <Text style={styles.authorTechText}>
                      {tech.trim().toLowerCase()}
                    </Text>
                  )}
                />
              </View>
            }
          />
        </View>
      </View>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>

        <Image
          source={getImage(post.thumbnail, appConfig.emptyThumbnail)}
          style={styles.postImage}
          alt={post.title}
          resizeMode="contain"
        />

        <View style={styles.postActions}>
          <View style={styles.postStatus}>
            <TouchableOpacity style={styles.statusItem} onPress={toggleLike}>
              <AntDesign
                name={liked ? 'heart' : 'hearto'}
                size={fontSize.md}
                color={liked ? colors.red[500] : colors.gray[200]}
              />
              <Text style={styles.statusItemText}>{post.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statusItem}
              onPress={handleNavigateComments}>
              <AntDesign
                name="message1"
                size={fontSize.md}
                color={colors.gray[200]}
              />
              <Text style={styles.statusItemText}>{post.comments}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.postDate}>
            Criado: {formatDate(post.createdAt)}
          </Text>
        </View>

        <Text style={styles.postDescription}>{post.description}</Text>

        <Button
          text="Ver detalhes"
          variation="outlined"
          containerStyle={styles.buttonContainer}
          onPress={handleNavigatePostDetail}
        />
      </View>
    </View>
  )
}
