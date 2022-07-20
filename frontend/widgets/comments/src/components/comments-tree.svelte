<script lang="ts">
	import Comment from './comment.svelte'

	export let comments: any[]
</script>

{#each comments as { comment, replies }}
	<div>
		<Comment {comment} />
		{#if replies?.length}
			<div class="replies">
				<svelte:self comments={replies} />
			</div>
		{/if}
	</div>
{/each}

<style>
	.replies {
		margin-left: 10px;
	}
</style>
