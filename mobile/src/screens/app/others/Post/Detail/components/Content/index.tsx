import { Fragment } from 'react'
import { View, Text, ScrollView, Image, RefreshControl } from 'react-native'
import moment from 'moment'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { FindOnePost } from '~/interfaces/entity/posts'
import { getImage } from '~/utils/getImage'
import { appConfig } from '~/config/app'

import { RenderValidation } from '~/components/RenderValidation'
import { Button } from '~/components/Button'
import { SectionTitle } from '~/components/SectionTitle'
import { Comment } from '~/screens/app/others/Post/Detail/components/Comment'
import { Mapper } from '~/components/Mapper'
import { useTheme } from '~/hooks/useTheme'

import styles from './styles'
import { useAccount } from '~/hooks/useAccount'
import { useModal } from '~/hooks/useModal'

moment.locale(appConfig.locale)

interface ContentProps {
  post?: FindOnePost
  refreshing: boolean
  onRefresh: () => void
}

export function Content({ post, refreshing, onRefresh }: ContentProps) {
  const { colors, fontSize } = useTheme()
  const { developer } = useAccount()
  const navigation = useNavigation()
  const modal = useModal()

  function getCorrectDateText(date: string, editAt?: boolean) {
    if (!date.length) {
      return ''
    }

    const formattedDate = moment(date).format('DD/MM/YYYY HH:MM')
    const message = editAt ? 'Última edição em:' : 'Pulicado em:'

    return `${message} ${formattedDate}`
  }

  function handleNavigateCommentsPage(postId?: string) {
    return () => {
      if (postId) {
        console.log('Navegar para tela de comentários', postId)
      }
    }
  }

  function handleNavigateCreateCommentPage(postId?: string) {
    return () => {
      if (postId) {
        console.log('Navegar para tela de criar comentários', postId)
      }
    }
  }

  function handleToggleLike(postId?: string) {
    return () => {
      if (postId) {
        console.log('Curtir/Descurtir', postId)
      }
    }
  }

  function handleNavigateToDeveloperDetail(developerId?: string) {
    return () => {
      if (developerId) {
        navigation.navigate('developerDetail', {
          developerId,
        })
      }
    }
  }

  function handleEditPost(postId?: string) {
    return () => {
      if (postId) {
        console.log('Navegar para tela de editar post', postId)
      }
    }
  }

  function handleRemovePost(postId?: string) {
    return () => {
      if (postId) {
        modal.alert(`Você tem certeza que deseja remover esse post?`, [
          {
            text: 'Deletar',
            onPress: () => {},
            style: 'destructive',
          },
          {
            style: 'cancel',
            text: 'Não remover',
          },
        ])
      }
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          tintColor={colors.purple[500]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {post?.title}
      </Text>

      <RenderValidation
        validation={Boolean(post?.editAt)}
        validComponent={
          <Text style={styles.author}>
            {getCorrectDateText(post?.editAt ?? '', true)}
          </Text>
        }
        unvalidComponent={
          <Text style={styles.author}>
            {getCorrectDateText(post?.createdAt ?? '')}
          </Text>
        }
      />

      <Text style={styles.author}>Por: {post?.author?.name}</Text>

      <Image
        source={getImage(post?.thumbnail, appConfig.emptyThumbnail)}
        style={styles.image}
        alt={post?.title}
      />

      <Text style={styles.description}>{post?.description}</Text>

      <SectionTitle text="Comentários" containerStyle={styles.sectionTitle} />

      <RenderValidation
        validation={(post?.comments ?? []).length === 0}
        unvalidComponent={
          <Fragment>
            <Mapper
              items={post?.comments ?? []}
              keyExtractor={(comment) => comment.id}
              renderItem={({ item: comment }) => <Comment comment={comment} />}
            />

            <Button
              text="Ver mais"
              rightIcon={
                <Feather
                  name="chevron-right"
                  size={fontSize.md}
                  color={colors.white}
                />
              }
              onPress={handleNavigateCommentsPage(post?.id)}
            />
          </Fragment>
        }
        validComponent={
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsContainerText}>
              Esse post não possui comentários, seja o primeiro a criar um!
            </Text>

            <Button
              text="Criar comentário"
              onPress={handleNavigateCreateCommentPage(post?.id)}
              containerStyle={styles.noCommentsContainerBtn}
            />
          </View>
        }
      />

      <SectionTitle text="Curtidas" containerStyle={styles.sectionTitle} />

      <RenderValidation
        validation={(post?.likes ?? 0) > 0}
        validComponent={
          <Text style={styles.likeText}>{post?.likes} curtidas</Text>
        }
      />

      <Button
        text="Curtir"
        containerStyle={styles.likeBtn}
        onPress={handleToggleLike(post?.id)}
        rightIcon={
          <Feather name="heart" size={fontSize.md} color={colors.white} />
        }
      />

      <SectionTitle text="Autor" containerStyle={styles.sectionTitle} />

      <View style={styles.authorContainer}>
        <Image
          style={styles.authorImage}
          source={getImage(post?.author.avatar_url, appConfig.emptyImage)}
          alt={`Foto do ${post?.author.name}`}
        />
        <View style={styles.authorContent}>
          <Text
            style={styles.authorName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {post?.author.name}
          </Text>

          <RenderValidation
            validation={(post?.author?.techs ?? '').length > 0}
            validComponent={
              <View style={styles.authorTechContainer}>
                <Mapper
                  items={post?.author.techs.split(',') ?? []}
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

      <Button
        text="Saiba mais"
        onPress={handleNavigateToDeveloperDetail(post?.developerId)}
        containerStyle={styles.authorBtn}
        variation="outlined"
      />

      <RenderValidation
        validation={developer?.id === post?.developerId}
        validComponent={
          <Fragment>
            <SectionTitle text="Ações" containerStyle={styles.sectionTitle} />

            <Button
              text="Editar Post"
              fullWidth
              onPress={handleEditPost(post?.id)}
              rightIcon={
                <Feather name="edit" size={fontSize.md} color={colors.white} />
              }
            />

            <Button
              text="Remover Post"
              fullWidth
              onPress={handleRemovePost(post?.id)}
              rightIcon={
                <Feather name="trash" size={fontSize.md} color={colors.white} />
              }
              type="error"
            />
          </Fragment>
        }
      />
    </ScrollView>
  )
}
