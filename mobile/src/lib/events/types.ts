export enum EventType {
  INTERACTION = 'interaction',
  APP = 'application',
}
export interface EventManagerCallbackParams {
  eventValue?: string | Record<string, string>
  eventName?: string
  eventType?: EventType
  eventScreenId?: string
}

export type EventManagerCallback = (
  params?: Partial<EventManagerCallbackParams>,
) => void
export type EventManagerObject = Map<string, Set<EventManagerCallback>>

export interface EventManagerEmmitConfig {
  withMiddleware: boolean
}
