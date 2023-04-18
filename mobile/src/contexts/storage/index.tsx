import { PropsWithChildren, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StorageContextValues, AsyncKey } from '~/interfaces/contexts/storage'
import { asyncStorageConfig } from '~/config/storage'

export const StorageContext = createContext({} as StorageContextValues)

export function StorageProvider(props: PropsWithChildren) {
  function errorCallback(key: string) {
    console.warn(
      `${key} doesn't exists in configuration, please use a real one`,
    )
  }

  async function getAsync(key: AsyncKey): Promise<string | null> {
    const has = validate(key)

    if (!has) {
      errorCallback(key)
      return null
    }

    const data = await AsyncStorage.getItem(key)
    return data
  }

  function insertNewValue(key: AsyncKey, value: any) {
    const has = validate(key)

    if (!has) {
      return errorCallback(key)
    }

    const formattedValue =
      typeof value === 'string' ? value : JSON.stringify(value)

    AsyncStorage.setItem(key, formattedValue)
  }

  function removeItem(key: AsyncKey) {
    const has = validate(key)

    if (has) {
      AsyncStorage.removeItem(key)
    }
  }

  function validate(key: AsyncKey): boolean {
    const has = asyncStorageConfig[key]
    return Boolean(has)
  }

  function convertData<Type>(data: string): Type | void {
    try {
      const result: Type = JSON.parse(data)
      return result
    } catch (err) {
      const convertError = `Error convert ${data}`
      const message = err instanceof Error ? err.message : convertError

      console.warn(message)
    }
  }

  function clearStorage() {
    AsyncStorage.clear()
  }

  return (
    <StorageContext.Provider
      value={{
        getAsync,
        insertNewValue,
        convertData,
        removeItem,
        clearStorage,
      }}>
      {props.children}
    </StorageContext.Provider>
  )
}
