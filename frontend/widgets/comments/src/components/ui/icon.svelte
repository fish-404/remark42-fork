<script lang="ts">
	import { onMount } from 'svelte'

	// icons
	import bell from './assets/bell.svg'
	import exit from './assets/exit.svg'

	// social icons
	import dev from './assets/dev.svg'
	import facebook from './assets/facebook.svg'
	import github from './assets/github.svg'
	import google from './assets/google.svg'
	import microsoft from './assets/microsoft.svg'
	import patreon from './assets/patreon.svg'
	import telegram from './assets/telegram.svg'
	import twitter from './assets/twitter.svg'
	import yandex from './assets/yandex.svg'

	const IconsMap = {
		// icons
		bell,
		exit,
		paid: null,
		verified: null,

		// social
		dev,
		facebook,
		github,
		google,
		microsoft,
		patreon,
		telegram,
		twitter,
		yandex,
	} as const

	export let name: keyof typeof IconsMap = 'bell'
	export let size: number = 20

	let html = fetch(IconsMap[name]).then((res) => res.text())
	let iconElement: HTMLDivElement

	onMount(() => {
		iconElement.style.setProperty('--size', `${size}px`)
	})
</script>

<div bind:this={iconElement} class="icon">
	{#await html then $html}
		{@html $html}
	{/await}
</div>

<style>
	.icon {
		--size: 20px;
		width: var(--size);
		height: var(--size);
	}
</style>
