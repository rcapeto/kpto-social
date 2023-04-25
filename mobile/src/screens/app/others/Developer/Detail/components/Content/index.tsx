import { useMemo } from 'react'
import { View, Image, ScrollView, RefreshControl } from 'react-native'
import { FindOneDeveloper } from '~/interfaces/entity/developer'
import moment from 'moment'
import { Feather } from '@expo/vector-icons'

import { getImage } from '~/utils/getImage'
import { appConfig } from '~/config/app'
import { useTheme } from '~/hooks/useTheme'
import { SectionTitle } from '~/components/SectionTitle'
import { Field, FieldProps } from '~/components/Field'
import { Button } from '~/components/Button'
import { Mapper } from '~/components/Mapper'
import { Post } from '~/screens/app/others/Developer/Detail/components/Post'
import styles from './styles'

moment.locale(appConfig.locale)

interface ContentProps {
  developer?: FindOneDeveloper
  refreshing: boolean
  onRefresh: () => void
}

const { colors, fontSize } = useTheme()

export function Content(props: ContentProps) {
  const fields = useMemo<FieldProps[]>(() => {
    const developer = props.developer

    if (!developer) {
      return []
    }

    return [
      {
        label: 'Nome',
        value: developer.name,
      },
      {
        label: 'Github',
        value: developer.github,
      },
      {
        label: 'Tecnologias',
        value: developer.techs.split(',').map((tech) => tech.trim()),
      },
      {
        label: 'Membro desde',
        value: moment(developer.createdAt).format('DD/MM/YYYY'),
      },
    ]
  }, [props.developer])

  const interactions = useMemo<FieldProps[]>(() => {
    const developer = props.developer

    if (!developer) {
      return []
    }

    return [
      {
        label: 'Comentários',
        value: String(developer._count.comments),
      },
      {
        label: 'Amigos',
        value: String(developer._count.friends),
      },
      {
        label: 'Curtidas',
        value: String(developer._count.likes),
      },
      {
        label: 'Posts',
        value: String(developer._count.posts),
      },
    ]
  }, [props.developer])

  function handleShowFriends(userId: string) {
    return () => {
      if (userId) {
        console.log('Navegar para tela de amigos >>>', userId)
      }
    }
  }

  function handleAddFriend(userId: string) {
    return () => {
      if (userId) {
        console.log('adicionar amigo >>', userId)
      }
    }
  }

  function handleRemoveFriend(userId: string) {
    return () => {
      if (userId) {
        console.log('remover amigo >>', userId)
      }
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
          tintColor={colors.purple[500]}
        />
      }>
      <SectionTitle text="Imagem" />

      <View style={styles.imageContainer}>
        <Image
          source={getImage(props.developer?.avatar_url, appConfig.emptyImage)}
          alt={props.developer?.name}
          style={styles.image}
        />
      </View>

      <SectionTitle text="Dados" containerStyle={styles.sectionContainer} />

      <Mapper
        items={fields}
        keyExtractor={(item) => item.label}
        renderItem={({ item: field }) => (
          <View style={styles.fieldContainer}>
            <Field {...field} />
          </View>
        )}
      />

      <SectionTitle
        text="Interações"
        containerStyle={styles.sectionContainer}
      />

      <Mapper
        items={interactions}
        keyExtractor={(item) => item.label}
        renderItem={({ item: field }) => (
          <View style={styles.fieldContainer}>
            <Field {...field} />
          </View>
        )}
      />

      <SectionTitle
        text="Publicações"
        containerStyle={styles.sectionContainer}
      />

      <Mapper
        items={props.developer?.posts ?? []}
        keyExtractor={(post) => post.id}
        renderItem={({ item: post }) => <Post post={post} />}
      />

      <SectionTitle text="Ações" containerStyle={styles.sectionContainer} />

      <Button
        text="Ver amigos"
        onPress={handleShowFriends(props.developer?.id ?? '')}
        fullWidth
        rightIcon={
          <Feather name="users" color={colors.white} size={fontSize.md} />
        }
      />

      <Button
        text="Adicionar amigo"
        onPress={handleAddFriend(props.developer?.id ?? '')}
        fullWidth
        type="success"
        rightIcon={
          <Feather name="user" color={colors.white} size={fontSize.md} />
        }
      />

      <Button
        text="Remover amigo"
        onPress={handleRemoveFriend(props.developer?.id ?? '')}
        fullWidth
        type="error"
        rightIcon={
          <Feather name="trash-2" color={colors.white} size={fontSize.md} />
        }
      />
    </ScrollView>
  )
}
