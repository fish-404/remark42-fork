<script lang="ts">
	import { capitalizeFirstLetter, getProviderData } from './oauth.lib'
	import type { OAuthProvider } from '@remark42/api/dist/typings'
	import Icon from '../ui/icon.svelte'

	export let provider: OAuthProvider
	export let location: string

	const BASE_URL = ''
	const siteId = ''
</script>

<a
	on:click
	target="_blank"
	rel="noopener noreferrer"
	href={`${BASE_URL}/auth/${provider}/login?from=${location}&site=${siteId}`}
	data-provider={provider}
>
	<Icon name={provider} />
</a>
