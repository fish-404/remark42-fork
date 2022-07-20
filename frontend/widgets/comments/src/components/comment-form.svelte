<script lang="ts">
	import { publicApi } from '../lib/api'
	import { addNewComment } from '../stores/comments'
	import { user, isLoading } from '../stores/user'
	import Auth from './auth/auth.svelte'
	import Button from './ui/button.svelte'

	export let pid: string | undefined = undefined
	let comment = ''

	$: isAuth = !$isLoading && !$user

	async function handleSubmit() {
		const newComment = await publicApi.addComment('https://remark42.com/demo/', {
			text: comment,
			pid,
		})

		addNewComment(newComment)
	}
</script>

<svelte:element this={isAuth ? 'div' : 'form'} on:submit|preventDefault={handleSubmit}>
	{pid}
	<textarea bind:value={comment} />
	{#if isAuth}
		<Auth />
	{:else}
		<Button type="submit">Submit</Button>
	{/if}
</svelte:element>
