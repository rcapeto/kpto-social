import { useMemo, useState } from 'react'
import { Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { Layout } from '~/components/Layout'
import { useModal } from '~/hooks/useModal'
import { http } from '@http/index'
import { useAccount } from '~/hooks/useAccount'

import { ErrorPage } from '~/screens/static/Error'
import { RenderValidation } from '~/components/RenderValidation'
import { Content } from '~/screens/app/others/Developer/Detail/components/Content'
import { Loader } from '~/screens/app/others/Developer/Detail/components/Loader'

interface Route {
  developerId: string
}

const title = 'Detalhes do(a) Dev.'

export function DeveloperDetail() {
  const [refreshing, setRefreshing] = useState(false)

  const modal = useModal()
  const route = useRoute()
  const { logout } = useAccount()
  const navigation = useNavigation()

  const params = route.params as Route

  const developerId = useMemo(() => params.developerId ?? '', [params])

  const {
    data: response,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery(
    ['developer', developerId],
    async () =>
      await http.getDeveloperRoutes().findOne(
        { developerId },
        {
          errorCallback: modal.handleShowModalError,
          unauthorizedCallback: logout,
        },
      ),
  )

  async function onRefresh() {
    try {
      setRefreshing(true)
      await refetch()
    } catch (err) {
      console.error('error [developer-detail]', err)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <Layout activeHeader headerProps={{ title, showBack: true }}>
      <RenderValidation
        validation={isLoading || isRefetching}
        validComponent={<Loader />}
        unvalidComponent={
          <RenderValidation
            validation={isError}
            validComponent={
              <ErrorPage
                errorMessage="O desenvolvedor não existe!"
                errorTitle="Uh-oh nada por aqui"
                onPressButton={navigation.goBack}
                buttonText="Voltar"
              />
            }
            unvalidComponent={
              <Content
                onRefresh={onRefresh}
                refreshing={refreshing}
                developer={response?.data.developer}
              />
            }
          />
        }
      />
    </Layout>
  )
}
