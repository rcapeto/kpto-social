import { useState, useMemo } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'

import {
  CreatePostSchema,
  createPostSchema,
} from '~/utils/validations/posts/createPost'
import { Layout } from '~/components/Layout'
import { SectionTitle } from '~/components/SectionTitle'
import { Button } from '~/components/Button'
import { Input, InputProps } from '~/components/Input'
import { Mapper } from '~/components/Mapper'
import styles from './styles'

const title = 'Publicar'

export function CreatePost() {
  const [thumbnail, setThumbnail] = useState('')

  const { handleSubmit, control } = useForm<CreatePostSchema>({
    defaultValues: {
      description: '',
      title: '',
    },
    resolver: zodResolver(createPostSchema),
  })

  async function handleCreatePost(values: CreatePostSchema) {}

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
        </View>

        <Button
          text="Publicar "
          onPress={handleSubmit(handleCreatePost)}
          containerStyle={styles.button}
        />
      </ScrollView>
    </Layout>
  )
}
