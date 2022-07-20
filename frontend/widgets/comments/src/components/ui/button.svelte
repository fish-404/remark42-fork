<script lang="ts">
	export let as: keyof HTMLElementTagNameMap = 'button'
	export let disabled: boolean = false
	export let kind: 'primary' | 'seamless' = 'primary'
	export let type = 'button'
</script>

<svelte:element this={as} class="button {kind}" on:click {type} {disabled}>
	<slot />
</svelte:element>

<style>
	.button {
		background: transparent;
		cursor: pointer;
		outline: none;
	}

	.seamless {
		padding: 0;
		margin: 0;
		border: 0;
		color: currentColor;
	}

	.primary {
		background: #0070f3;
		color: #fff;
		border: 1px solid #0070f3;
	}
</style>
