import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'

import { http } from '@http/index'
import { Layout } from '~/components/Layout'
import { RenderValidation } from '~/components/RenderValidation'
import { useStorage } from '~/hooks/useStorage'
import { useModal } from '~/hooks/useModal'
import { useAccount } from '~/hooks/useAccount'
import { picker } from '~/utils/picker'
import { MeDeveloper } from '~/interfaces/entity/developer'
import { Content } from '~/screens/app/tabs/Profile/components/Content'
import { Loader } from '~/screens/app/tabs/Profile/components/Loader'
import { ErrorPage } from '~/screens/static/Error'

const title = 'Perfil'

export function Profile() {
  const [refreshing, setRefreshing] = useState(false)
  const [developerToken, setDeveloperToken] = useState('')

  const storage = useStorage()
  const { logout } = useAccount()
  const modal = useModal()

  const { data, isLoading, isError, isRefetching, refetch } = useQuery(
    'developer',
    async () => await getProfileData(),
  )

  const getProfileData = useCallback(async () => {
    const token = await storage.getAsync('token')

    if (!token) {
      return undefined
    }

    setDeveloperToken(token)

    const response = await http.getAccountRoutes().me(
      { token },
      {
        errorCallback: modal.handleShowModalError,
        unauthorizedCallback: logout,
      },
    )

    if (
      response &&
      picker(response, 'data') &&
      picker(response.data, 'developer')
    ) {
      return picker(response.data, 'developer') as MeDeveloper
    }
  }, [storage, modal, logout])

  async function handleRefreshPage() {
    try {
      setRefreshing(true)
      await refetch()
    } catch (err) {
      console.error('error [profile]', err)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <Layout headerProps={{ title }} activeHeader contentWithPadding>
      <RenderValidation
        validation={isLoading || isRefetching}
        validComponent={<Loader />}
        unvalidComponent={
          <RenderValidation
            validation={isError || !data}
            validComponent={
              <ErrorPage
                errorMessage="Ocorreu algum erro para obter os seus dados, tente novamente!"
                errorTitle="Uh-oh nada por aqui"
                onPressButton={handleRefreshPage}
                buttonText="Recarregar"
              />
            }
            unvalidComponent={
              <Content
                developer={data}
                refreshing={refreshing}
                onRefresh={handleRefreshPage}
                developerToken={developerToken}
              />
            }
          />
        }
      />
    </Layout>
  )
}
