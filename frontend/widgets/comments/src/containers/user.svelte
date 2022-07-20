<script lang="ts">
	import User from '../components/user.svelte'
	import { publiApi } from '../lib/api'

	let user = publiApi.getUser()
</script>

{#await user}
	<div>Loading...</div>
{:then $user}
	<User {...$user} />
{/await}
