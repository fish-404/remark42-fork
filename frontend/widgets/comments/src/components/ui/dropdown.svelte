<script lang="ts">
	import { fade } from 'svelte/transition'
	import Button from './button.svelte'

	export let buttonLabel = 'Dropdown'
	let show: boolean = false

	function toggleVisibility() {
		console.log('1')
		show = !show
	}
</script>

<div class="root">
	<Button on:click={toggleVisibility}>{buttonLabel}</Button>
	{#if show}
		<div class="dropdown" in:fade={{ duration: 50 }} out:fade={{ duration: 50 }}>
			<slot />
		</div>
	{/if}
</div>

<style>
	.root {
		position: relative;
	}
	.dropdown {
		position: absolute;
		top: 100%;
		border: 1px solid #ccc;
		padding: 10px;
		background: #fff;
	}
</style>
