import { useMemo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '~/components/Layout'
import { Input, InputProps } from '~/components/Input'
import { Mapper } from '~/components/Mapper'
import { useTheme } from '~/hooks/useTheme'
import {
  RegisterSchema,
  registerSchema,
} from '~/utils/validations/authentication/register'

import styles from './styles'
import { Button } from '~/components/Button'
import { HelpPassword } from '~/components/HelpPassword'
import { useAccount } from '~/hooks/useAccount'
import { useModal } from '~/hooks/useModal'

const { colors, fontSize } = useTheme()

const defaultIconStyle = {
  color: colors.white,
  size: fontSize.lg,
}

export function Register() {
  const account = useAccount()
  const navigation = useNavigation()
  const modal = useModal()

  const { control, handleSubmit } = useForm<RegisterSchema>({
    defaultValues: {
      github: '',
      password: '',
      confirm_password: '',
      name: '',
    },
    resolver: zodResolver(registerSchema),
  })

  async function handlePressRegisterButton(values: RegisterSchema) {
    await account.register(values, handleGoToLogin)
  }

  function handleGoToLogin() {
    modal.handleShowModalSuccess('Usuário criado com sucesso!', {
      onPressSuccessButton: navigation.goBack,
    })
  }

  const inputs = useMemo<InputProps[]>(() => {
    return [
      {
        label: 'Nome Completo',
        placeholder: 'John Doe',
        required: true,
        iconLeft: <Feather name="user" {...defaultIconStyle} />,
        name: 'name',
        nativeProps: {
          autoComplete: 'name',
          autoCorrect: false,
          autoCapitalize: 'words',
        },
      },
      {
        label: 'Github',
        placeholder: '@seu-git',
        required: true,
        iconLeft: <Feather name="user" {...defaultIconStyle} />,
        name: 'github',
        nativeProps: {
          autoCapitalize: 'none',
          autoCorrect: false,
        },
      },
      {
        label: 'Senha',
        required: true,
        isPassword: true,
        placeholder: 'Sua senha',
        iconLeft: <Feather name="lock" {...defaultIconStyle} />,
        name: 'password',
        nativeProps: {
          autoCorrect: false,
          autoComplete: 'off',
        },
      },
      {
        label: 'Confirmação de senha',
        required: true,
        isPassword: true,
        placeholder: 'Confirme sua senha',
        iconLeft: <Feather name="lock" {...defaultIconStyle} />,
        name: 'confirm_password',
        nativeProps: {
          autoCorrect: false,
          autoComplete: 'off',
        },
      },
    ]
  }, [])

  return (
    <Layout
      contentWithPadding
      activeHeader
      headerProps={{ showBack: true, title: 'Novo usuário' }}>
      <ScrollView
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}>
        <Mapper
          items={inputs}
          keyExtractor={(input) => input.name}
          renderItem={({ item: input }) => (
            <View style={styles.input}>
              <Controller
                control={control}
                name={input.name as keyof RegisterSchema}
                rules={{ required: input.required }}
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
                    nativeProps={{ onBlur, ...input.nativeProps }}
                    hasValidation={name === 'password'}
                    validationComponent={(text) => <HelpPassword text={text} />}
                  />
                )}
              />
            </View>
          )}
        />

        <Button
          onPress={handleSubmit(handlePressRegisterButton)}
          text="Cadastre-se"
        />
      </ScrollView>
    </Layout>
  )
}
