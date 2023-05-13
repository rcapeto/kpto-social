import { useMemo, useState } from 'react'
import { View, ScrollView, RefreshControl, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
// import { useNavigation } from '@react-navigation/native'

import { FieldProps, Field } from '~/components/Field'
import { Mapper } from '~/components/Mapper'
import { Button } from '~/components/Button'
import { SectionTitle } from '~/components/SectionTitle'
import { useTheme } from '~/hooks/useTheme'
import { useModal } from '~/hooks/useModal'
import { useEvents } from '~/hooks/useEvents'
import { useAccount } from '~/hooks/useAccount'
import { formatDate } from '~/utils/formatDate'
import { picker } from '~/utils/picker'
import { getImage } from '~/utils/getImage'
import { MeDeveloper } from '~/interfaces/entity/developer'
import { appConfig } from '~/config/app'
import { http } from '@http/index'
import { Status } from '@http/enums/status'
import { EventsDeveloperEnum } from '@events/enums/developers'
import { paths } from '~/routes/config/paths'
import { EventType } from '@events/types'

import styles from './styles'
import { createEventName } from '~/lib/events/utils/createEventName'

interface Props {
  developer?: MeDeveloper
  refreshing: boolean
  onRefresh: () => Promise<void>
  developerToken: string
}

export function Content(props: Props) {
  const [requestLoading, setRequestLoading] = useState(false)
  const { colors, fontSize } = useTheme()
  const { logout } = useAccount()
  const modal = useModal()
  const { eventManager } = useEvents()
  // const navigation = useNavigation()

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
        value: formatDate(developer.createdAt),
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

  function handleNavigateUpdateDeveloper() {
    console.log('Navigate to Correct screen [update developer]')
  }

  async function handleDelete() {
    const response = await http.getDeveloperRoutes().delete({
      errorCallback: modal.handleShowModalError,
      unauthorizedCallback: logout,
    })

    if (response && picker(response, 'status')) {
      const status = picker(response, 'status')

      if (status === Status.OK) {
        const message = 'Conta deletada com sucesso.'
        modal.handleShowModalSuccess(message, {
          onPressSuccessButton: onPressModalSuccessButton,
        })
      }
    }
  }

  function onPressModalSuccessButton() {
    eventManager.emmit(EventsDeveloperEnum.DELETE, {
      eventName: createEventName('Delete developer'),
      eventScreenId: paths.app.profile,
      eventType: EventType.INTERACTION,
      eventValue: Object.assign({
        developer: props.developer,
        token: props.developerToken,
      }),
    })

    logout()
  }

  function handlePressDeleteDev() {
    const message = 'Você tem certeza que quer apagar sua conta?'

    modal.alert(message, [
      {
        style: 'cancel',
        text: 'Não, eu não desejo deletar',
      },
      {
        style: 'destructive',
        text: 'Sim, eu desejo deletar',
        onPress: handleDelete,
      },
    ])
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
      <View style={styles.imageContainer}>
        <Image
          source={getImage(props.developer?.avatar_url, appConfig.emptyImage)}
          alt={props.developer?.name ?? ''}
          style={styles.image}
        />
      </View>

      <SectionTitle text="Meus dados" containerStyle={styles.sectionTitle} />

      <Mapper
        items={fields}
        keyExtractor={(field) => field.label}
        renderItem={({ item: field }) => (
          <View style={styles.input}>
            <Field {...field} />
          </View>
        )}
      />

      <SectionTitle
        text="Minhas interações"
        containerStyle={styles.sectionTitle}
      />

      <Mapper
        items={interactions}
        keyExtractor={(field) => field.label}
        renderItem={({ item: field }) => (
          <View style={styles.input}>
            <Field {...field} />
          </View>
        )}
      />

      <View style={styles.buttonsContainer}>
        <Button
          onPress={logout}
          text="Sair"
          fullWidth
          rightIcon={
            <Feather name="log-out" size={fontSize.sm} color={colors.white} />
          }
        />
        <Button
          onPress={handleNavigateUpdateDeveloper}
          fullWidth
          text="Alterar dados"
          type="success"
          rightIcon={
            <Feather name="edit" size={fontSize.sm} color={colors.white} />
          }
        />
        <Button
          onPress={handlePressDeleteDev}
          fullWidth
          text="Deletar"
          type="error"
          rightIcon={
            <Feather name="trash-2" size={fontSize.sm} color={colors.white} />
          }
          disabled={requestLoading}
        />
      </View>
    </ScrollView>
  )
}
