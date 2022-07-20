import type { User } from '@remark42/api/dist/typings'
import { get, Writable, writable } from 'svelte/store'
import { publicApi } from '../lib/api'

const timeout = 1000 * 60 * 5 // 5 minutes
const lastUpdate = writable()
export const user = writable<User | null | undefined>(undefined, () => {
	if (get(isLoading) || get(user) !== undefined || get(lastUpdate) > Date.now() - timeout) {
		return
	}

	isLoading.set(true)
	publicApi.getUser().then((data) => {
		lastUpdate.set(Date.now())
		user.set(data)
		isLoading.set(false)
	})
})
export const isLoading = writable(false)

export function mutateUser(data: User | null) {
	lastUpdate.set(Date.now())
	user.set(data)
}
