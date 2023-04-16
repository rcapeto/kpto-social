import { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '~/components/Layout'
import { SectionTitle } from '~/components/SectionTitle'
import { Input, InputProps } from '~/components/Input'
import { Mapper } from '~/components/Mapper'
import { useTheme } from '~/hooks/useTheme'
import {
  LoginSchema,
  loginSchema,
} from '~/utils/validations/authentication/login'

import styles from './styles'
import { Button } from '~/components/Button'

const { colors, fontSize } = useTheme()

const defaultIconStyle = {
  color: colors.white,
  size: fontSize.lg,
}

export function Login() {
  const navigation = useNavigation()

  const { control, handleSubmit } = useForm<LoginSchema>({
    defaultValues: {
      github: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  function handlePressLoginButton(values: LoginSchema) {
    console.log('values here', values)
  }

  function handleGoToRegisterScreen() {
    navigation.navigate('register')
  }

  const inputs = useMemo<InputProps[]>(() => {
    return [
      {
        label: 'Github',
        placeholder: '@seu-git',
        required: true,
        iconLeft: <Feather name="user" {...defaultIconStyle} />,
        name: 'github',
        nativeProps: {
          autoComplete: 'off',
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
          autoComplete: 'off',
          autoCorrect: false,
        },
      },
    ]
  }, [])

  return (
    <Layout contentWithPadding>
      <SectionTitle text="Entrar" isCenter />

      <View style={styles.form}>
        <Mapper
          items={inputs}
          keyExtractor={(input) => input.name}
          renderItem={({ item: input }) => (
            <View style={styles.input}>
              <Controller
                control={control}
                name={input.name as keyof LoginSchema}
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
                    nativeProps={{ onBlur }}
                  />
                )}
              />
            </View>
          )}
        />

        <Button onPress={handleSubmit(handlePressLoginButton)} text="Entrar" />

        <Button
          onPress={handleGoToRegisterScreen}
          text="Não possui uma conta? Cadastre=se"
          rightIcon={
            <Feather
              name="arrow-right"
              {...defaultIconStyle}
              color={colors.purple[500]}
            />
          }
          variation="outlined"
        />
      </View>
    </Layout>
  )
}
