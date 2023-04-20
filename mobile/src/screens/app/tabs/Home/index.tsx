import { View, Text, FlatList, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'

import { Layout } from '~/components/Layout'
import { Loading } from '~/components/Loading'
import { RenderValidation } from '~/components/RenderValidation'
import { usePosts } from '~/screens/app/tabs/Home/hooks/usePosts'
import { PostsLoading } from '~/screens/app/tabs/Home/components/PostsLoading'
import { RenderPost } from '~/screens/app/tabs/Home/components/RenderPost'

import { FindManyPost } from '~/interfaces/entity/posts'
import { useModal } from '~/hooks/useModal'
import { useTheme } from '~/hooks/useTheme'

import styles from './styles'

const title = 'Início'

export function Home() {
  const modal = useModal()
  const { colors } = useTheme()

  const [posts, setPosts] = useState<FindManyPost[]>([])
  const [count, setCount] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const {
    data: queryPosts,
    fetchNextPage,
    refetch,
    isLoading,
    isRefetching,
  } = usePosts({ perPage: 1 }, showModalError)

  function showModalError(errorMessage?: string) {
    modal.open({
      isError: true,
      title: 'Ops! Ocorreu algum erro',
      description: errorMessage,
      icon: <Feather name="alert-circle" color={colors.red[500]} size={50} />,
      buttons: [{ text: 'Ok!', type: 'error', fullWidth: true }],
    })
  }

  async function handleRefresh() {
    setRefreshing(true)
    setPosts([])

    try {
      const { data: response } = await refetch()
      const results = response?.pages ?? []
      const items = results.map((result) => result?.posts ?? []).flat()

      setPosts(items)
      setCount(results?.[0]?.count ?? 0)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Ocorreu algum erro, por favor tente novamente'
      showModalError(errorMessage)
    } finally {
      setRefreshing(false)
    }
  }

  async function handleEndReached() {
    await fetchNextPage()
  }

  useEffect(() => {
    const results = queryPosts?.pages ?? []
    const items = results.map((result) => result?.posts ?? []).flat()

    setPosts(items)
    setCount(results?.[0]?.count ?? 0)
  }, [queryPosts])

  return (
    <Layout headerProps={{ title }} activeHeader>
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text style={styles.countTitle}>Posts</Text>
          <Text style={styles.count}>{count}</Text>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={({ item: post }) => <RenderPost post={post} />}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <RenderValidation
              validation={isLoading}
              validComponent={<PostsLoading />}
            />
          }
          ListFooterComponent={
            <RenderValidation
              validation={isRefetching && !refreshing}
              validComponent={<Loading />}
            />
          }
          onEndReachedThreshold={0.2}
          onEndReached={handleEndReached}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.purple[300]}
            />
          }
        />
      </View>
    </Layout>
  )
}
