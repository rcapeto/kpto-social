import moment from 'moment'
import { appConfig } from '~/config/app'

moment.locale(appConfig.locale)

export enum FormatDate {
  YEAR = 'DD/MM/YYYY',
  YEAR_AND_HOURS = 'DD/MM/YYYY HH:MM',
}

export function formatDate(date: string, format?: FormatDate) {
  const defaultFormat = format ?? FormatDate.YEAR
  return moment(date).format(defaultFormat)
}
