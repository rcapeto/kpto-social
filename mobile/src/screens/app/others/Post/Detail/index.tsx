import { useMemo, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { Layout } from '~/components/Layout'
import { http } from '@http/index'
import { useAccount } from '~/hooks/useAccount'
import { useModal } from '~/hooks/useModal'

import { ErrorPage } from '~/screens/static/Error'
import { RenderValidation } from '~/components/RenderValidation'
import { Content } from '~/screens/app/others/Post/Detail/components/Content'
import { Loader } from '~/screens/app/others/Post/Detail/components/Loader'

interface Route {
  postId: string
}

export function PostDetail() {
  const [refreshing, setRefreshing] = useState(false)

  const { logout } = useAccount()
  const modal = useModal()
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params as Route
  const postId = useMemo(() => params.postId ?? '', [params])

  const {
    data: response,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery(['post', postId], async () => {
    return await http.getPostRoutes().findOne(
      { postId },
      {
        unauthorizedCallback: logout,
        errorCallback: modal.handleShowModalError,
      },
    )
  })

  const post = useMemo(() => {
    return response?.data.post
  }, [response])

  async function onRefresh() {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <Layout
      activeHeader
      headerProps={{ title: 'Detalhes do Post', showBack: true }}>
      <RenderValidation
        validation={isLoading || isRefetching}
        validComponent={<Loader />}
        unvalidComponent={
          <RenderValidation
            validation={!post || isError}
            validComponent={
              <ErrorPage
                errorMessage="O post que você deseja acessar não existe mais, procure por outros 👻 "
                errorTitle="Uh-oh nada por aqui"
                onPressButton={navigation.goBack}
                buttonText="Voltar"
              />
            }
            unvalidComponent={
              <Content
                post={post}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        }
      />
    </Layout>
  )
}
