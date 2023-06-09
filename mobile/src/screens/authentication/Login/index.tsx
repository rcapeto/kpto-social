import { useEffect, useMemo, useState } from 'react'
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
import { useAccount } from '~/hooks/useAccount'
import { Checkbox } from '~/components/Checkbox'
import { useStorage } from '~/hooks/useStorage'

const { colors, fontSize } = useTheme()

const defaultIconStyle = {
  color: colors.white,
  size: fontSize.lg,
}

export function Login() {
  const navigation = useNavigation()
  const account = useAccount()
  const storage = useStorage()

  const [rememberChecked, setRememberChecked] = useState(false)
  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<LoginSchema>({
      defaultValues: {
        github: '',
        password: '',
      },
      resolver: zodResolver(loginSchema),
    })

  async function handlePressLoginButton(values: LoginSchema) {
    await account.login(values, onSuccessLogin)
  }

  function saveLoginInStorage(login: LoginSchema) {
    storage.insertNewValue('loginRemember', login)
  }

  function onSuccessLogin() {
    if (rememberChecked) {
      const values = getValues()
      saveLoginInStorage(values)
    } else {
      storage.removeItem('loginRemember')
    }

    resetForm()
  }

  function resetForm() {
    reset()
    setRememberChecked(false)
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
      },
    ]
  }, [])

  useEffect(() => {
    storage.getAsync('loginRemember').then((login) => {
      if (login) {
        const data = storage.convertData(login) as LoginSchema

        setValue('github', data.github)
        setValue('password', data.password)
        setRememberChecked(true)
      }
    })
  }, [storage, setValue])

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
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors[name]?.message}
                    nativeProps={{ onBlur, ...input.nativeProps }}
                    {...input}
                    name={name}
                  />
                )}
              />
            </View>
          )}
        />

        <View style={styles.rememberContainer}>
          <Checkbox
            checkboxLabel="Salvar meu login"
            checked={rememberChecked}
            onCheck={setRememberChecked}
          />
        </View>

        <Button
          onPress={handleSubmit(handlePressLoginButton)}
          text="Entrar"
          isLoading={account.isRequesting}
        />

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
