import { asyncStorageConfig } from '~/config/storage'

export type AsyncStorageConfig = typeof asyncStorageConfig
export type AsyncKey = keyof AsyncStorageConfig

export interface StorageContextValues {
  getAsync: (key: AsyncKey) => Promise<string | null>
  insertNewValue: (key: AsyncKey, value: any) => void
  convertData: <Type>(data: string) => Type | void
  removeItem: (key: AsyncKey) => void
  clearStorage: () => void
}
