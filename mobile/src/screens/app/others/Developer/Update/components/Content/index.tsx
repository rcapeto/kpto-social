import { useMemo } from 'react'
import { View, Image, ScrollView, RefreshControl } from 'react-native'
import { FindOneDeveloper } from '~/interfaces/entity/developer'
import { Feather } from '@expo/vector-icons'

import { getImage } from '~/utils/getImage'
import { formatDate } from '~/utils/formatDate'
import { appConfig } from '~/config/app'
import { useTheme } from '~/hooks/useTheme'
import { SectionTitle } from '~/components/SectionTitle'
import { Field, FieldProps } from '~/components/Field'
import { Button } from '~/components/Button'
import { Mapper } from '~/components/Mapper'
import styles from './styles'

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
        value: developer.techs
          ? developer.techs.split(',').map((tech) => tech.trim())
          : '',
      },
      {
        label: 'Membro desde',
        value: formatDate(developer.createdAt),
      },
    ]
  }, [props.developer])

  function onPressSave() {}

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

      <Button
        text="Alterar dados"
        onPress={onPressSave}
        fullWidth
        rightIcon={
          <Feather name="save" color={colors.white} size={fontSize.md} />
        }
      />
    </ScrollView>
  )
}
