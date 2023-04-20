import { FunctionComponent } from 'react'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { paths } from '~/routes/config/paths'
import { createTabbarOptions } from '~/routes/app/tabbar/utils/createTabbarOptions'

import { Home } from '~/screens/app/Home'
import { Chat } from '~/screens/app/Chat'
import { Profile } from '~/screens/app/Profile'
import { Search } from '~/screens/app/Search'
import { CreatePost } from '~/screens/app/CreatePost'

interface TabbarItem {
  name: string
  component: FunctionComponent<any>
  options: BottomTabNavigationOptions
}

export const bottomTabs: TabbarItem[] = [
  {
    name: paths.app.home,
    component: Home,
    options: createTabbarOptions({ icon: 'home', label: 'Início' }),
  },
  {
    name: paths.app.chat,
    component: Chat,
    options: createTabbarOptions({
      icon: 'message-circle',
      label: 'Conversas',
    }),
  },
  {
    name: paths.app.createPost,
    component: CreatePost,
    options: createTabbarOptions({
      icon: 'plus',
      label: 'Publicar',
    }),
  },
  {
    name: paths.app.search,
    component: Search,
    options: createTabbarOptions({ icon: 'search', label: 'Buscar' }),
  },
  {
    name: paths.app.profile,
    component: Profile,
    options: createTabbarOptions({ icon: 'user', label: 'Perfil' }),
  },
]
