import type {
	Config as ServerConfig,
	OAuthProvider,
	FormProvider,
	Provider,
} from '@remark42/api/dist/typings'
import { get, writable } from 'svelte/store'
import { publicApi } from '../lib/api'

export type Config = {
	providers: {
		oauth: OAuthProvider[]
		form: FormProvider[]
	}
}

const isLoading = writable(false)

export const config = writable<Config>({
	providers: {
		oauth: [],
		form: [],
	},
})

export function formatProviders(providers: Provider[]): {
	oauth: OAuthProvider[]
	form: FormProvider[]
} {
	const oauth: OAuthProvider[] = []
	const form: FormProvider[] = []

	providers.forEach((p) => {
		;['email', 'anonymous'].includes(p)
			? form.push(p as FormProvider)
			: oauth.push(p as OAuthProvider)
	})

	return { oauth, form }
}

function formatConfig(config: ServerConfig): Config {
	return {
		providers: formatProviders(config.auth_providers),
	}
}

export function fetchConfig() {
	isLoading.set(true)
	publicApi.getConfig().then((data) => {
		config.set(formatConfig(data))
		isLoading.set(false)
	})
}
