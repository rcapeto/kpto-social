import axios from 'axios'
import { useTheme } from '~/hooks/useTheme'

const { isAndroid } = useTheme()

const api = axios.create({})
