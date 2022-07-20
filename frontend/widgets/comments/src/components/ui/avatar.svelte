<script lang="ts">
	export let size = 20
	export let src: string
	export let username: string
</script>

<div class="root" style="--size:{size}px">
	<img class="img" {src} alt={username} />
</div>

<style>
	.root {
		overflow: hidden;
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background: #ccc;
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
