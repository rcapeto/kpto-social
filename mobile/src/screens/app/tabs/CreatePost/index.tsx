import { useState, useMemo } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import {
  CreatePostSchema,
  createPostSchema,
} from '~/utils/validations/posts/createPost'
import { Layout } from '~/components/Layout'
import { SectionTitle } from '~/components/SectionTitle'
import { Button } from '~/components/Button'
import { Input, InputProps } from '~/components/Input'
import { Mapper } from '~/components/Mapper'
import { RenderValidation } from '~/components/RenderValidation'
import { useTheme } from '~/hooks/useTheme'
import { useModal } from '~/hooks/useModal'
import { useAccount } from '~/hooks/useAccount'
import { first } from '~/utils/first'
import { picker } from '~/utils/picker'
import { Status } from '@http/enums/status'
import { http } from '@http/index'

import styles from './styles'

const title = 'Publicar'

interface Action {
  onPress: () => void
  name: keyof typeof Feather.glyphMap
  color: string
  size: number
}

export function CreatePost() {
  const [thumbnail, setThumbnail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const modal = useModal()
  const { colors, fontSize } = useTheme()
  const { logout } = useAccount()
  const navigation = useNavigation()

  const { handleSubmit, control, reset } = useForm<CreatePostSchema>({
    defaultValues: {
      description: '',
      title: '',
    },
    resolver: zodResolver(createPostSchema),
  })

  function resetForm() {
    setIsLoading(false)
    setThumbnail('')
    reset()
  }

  async function handleCreatePost(values: CreatePostSchema) {
    const { description, title } = values

    const response = await http.getPostRoutes().create(
      { description, title, thumbnail },
      {
        dispatchLoading: toggleLoading,
        unauthorizedCallback: modal.handleShowModalError,
        errorCallback: logout,
      },
    )

    if (response) {
      const status = picker(response, 'status')

      if (status === Status.CREATED) {
        modal.handleShowModalSuccess('Post criado com sucesso!', {
          onPressSuccessButton: () => {
            navigation.navigate('home')
            resetForm()
          },
        })
      }
    }
  }

  const inputs = useMemo<InputProps[]>(() => {
    return [
      {
        name: 'title',
        label: 'Título',
        required: true,
        nativeProps: {
          autoCapitalize: 'none',
          autoCorrect: false,
        },
        placeholder: 'Digite o título',
      },
      {
        name: 'description',
        label: 'Descrição',
        required: true,
        nativeProps: {
          multiline: true,
          autoCapitalize: 'none',
          autoCorrect: false,
          style: {
            minHeight: 180,
          },
        },
        placeholder: 'Digite sua incrível descrição',
      },
    ]
  }, [])

  const actions = useMemo<Action[]>(() => {
    return [
      {
        onPress: pickImage,
        color: colors.gray[300],
        size: fontSize.sm,
        name: 'edit-2',
      },
      {
        onPress: resetThumbnail,
        color: colors.red[500],
        size: fontSize.sm,
        name: 'trash-2',
      },
    ]
  }, [fontSize, colors])

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    })

    if (!result.canceled) {
      const image = first(result.assets)
      const uri = image ? picker(image, 'uri') : ''

      if (uri) {
        setThumbnail(uri as string)
      }
    }
  }

  function resetThumbnail() {
    setThumbnail('')
  }

  function toggleLoading() {
    setIsLoading((prev) => !prev)
  }

  return (
    <Layout headerProps={{ title }} activeHeader contentWithPadding>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <SectionTitle text="Criar nova publicação" />

        <View style={styles.inputs}>
          <Mapper
            items={inputs}
            keyExtractor={(input) => input.name}
            renderItem={({ item: input }) => (
              <View style={styles.input}>
                <Controller
                  name={input.name as keyof CreatePostSchema}
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onBlur, onChange, name, value },
                    formState: { errors },
                  }) => (
                    <Input
                      {...input}
                      name={name}
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors[name]?.message}
                      nativeProps={{
                        onBlur,
                        ...input.nativeProps,
                      }}
                    />
                  )}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.imageText}>Imagem</Text>

          <View style={styles.selectImageContainer}>
            <RenderValidation
              validation={Boolean(thumbnail)}
              validComponent={
                <View style={styles.actions}>
                  <Mapper
                    items={actions}
                    keyExtractor={(action) => action.name}
                    renderItem={({ item: { onPress, ...icon } }) => (
                      <TouchableOpacity style={styles.action} onPress={onPress}>
                        <Feather {...icon} />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              }
            />
            <RenderValidation
              validation={!thumbnail}
              validComponent={
                <TouchableOpacity
                  style={styles.selectImageBtn}
                  onPress={pickImage}>
                  <Feather
                    name="image"
                    color={colors.gray[300]}
                    size={fontSize.sm}
                  />
                </TouchableOpacity>
              }
              unvalidComponent={
                <Image
                  source={{ uri: thumbnail }}
                  style={styles.selectedImage}
                  alt="Imagem escolhida pelo usuário"
                />
              }
            />
          </View>
        </View>

        <Button
          text="Publicar "
          onPress={handleSubmit(handleCreatePost)}
          containerStyle={styles.button}
          disabled={isLoading}
        />
      </ScrollView>
    </Layout>
  )
}
