import { HTTPErrorCallback, HTTPUnauthorizedCallback } from '@http/types/http'
import { checkResponseAPI } from '@http/utils/checkResponse'
import { getZodError } from '@http/utils/getZodError'
import { checkIsUnauthorized } from '@http/utils/checkIsUnauthorized'

import {
  LoginParams,
  LoginResponse,
  loginParams,
  RegisterParams,
  RegisterResponse,
  registerParams,
  MeParams,
  MeResponse,
} from '@http/routes/account/types'

import api, { manipulateHeaderAPI } from '~/services/api'
import { apiURLs } from '@http/config/api-urls'
import { picker } from '~/utils/picker'
import { responseMapper, errorMapper } from '@http/utils/mapper'

const path = apiURLs.account
