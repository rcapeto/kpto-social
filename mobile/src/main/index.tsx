import { QueryClientProvider } from 'react-query'
import { RootSiblingParent } from 'react-native-root-siblings'

import { Compose } from '~/components/Compose'
import { Routes } from '~/routes'
import { ModalProvider } from '~/contexts/modal'
import { EventContextProvider } from '~/contexts/events'
import { client } from '~/config/react-query'

const appContexts = [EventContextProvider, ModalProvider]

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
