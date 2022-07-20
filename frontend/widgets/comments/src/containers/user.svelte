<script lang="ts">
	import User from '../components/user.svelte'
	import { user, isLoading } from '../stores/user'
</script>

<div>
	{#if $isLoading}
		<div>Loading...</div>
	{:else if $user}
		<User {...$user} />
	{/if}
</div>
