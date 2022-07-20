import type { Client } from '@remark42/api/dist/clients/index'
import { createPublicClient } from '@remark42/api/dist/clients/public'

const siteId = 'remark42'
const baseUrl = 'https://demo.remark42.com'

export let authApi = createPublicClient({ siteId, baseUrl })
export let publiApi: Client['public']
export let adminApi: Client['admin']
