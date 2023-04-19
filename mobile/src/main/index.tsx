import { QueryClientProvider } from 'react-query'
import { RootSiblingParent } from 'react-native-root-siblings'

import { Compose } from '~/components/Compose'
import { Routes } from '~/routes'
import { ModalProvider } from '~/contexts/modal'
import { EventContextProvider } from '~/contexts/events'
import { AccountProvider } from '~/contexts/account'
import { StorageProvider } from '~/contexts/storage'
import { client } from '~/config/react-query'

const appContexts = [
  StorageProvider,
  EventContextProvider,
  ModalProvider,
  AccountProvider,
]

export function Main() {
  return (
    <QueryClientProvider client={client}>
      <RootSiblingParent>
        <Compose contexts={appContexts}>
          <Routes />
        </Compose>
      </RootSiblingParent>
    </QueryClientProvider>
  )
}
