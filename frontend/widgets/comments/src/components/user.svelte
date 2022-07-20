<script lang="ts">
	import Avatar from './ui/avatar.svelte'

	import Button from './ui/button.svelte'
	import Icon from './ui/icon.svelte'

	export let id: string
	export let name: string
	export let picture: string
	export let verified = false
	export let paid_sub = false
</script>

<article class="root" data-id={id}>
	<Avatar src={picture} username={name} />
	<span>{name}</span>
	{#if verified}<Icon name="verified" />{/if}
	{#if paid_sub}<Icon name="paid" />{/if}
	<Button kind="seamless">
		<Icon name="bell" />
	</Button>
	<Button kind="seamless">
		<Icon name="exit" />
	</Button>
</article>

<style>
	.root {
		display: flex;
	}
	.root > :global(* + *) {
		margin-left: 5px;
	}
</style>
