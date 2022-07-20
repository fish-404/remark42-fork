<script lang="ts">
	import Button from './ui/button.svelte'
	import CommentForm from './comment-form.svelte'
	import { publicApi } from '../lib/api'
	import CommentAdminActions from './comment-admin-actions.svelte'

	export let comment: any

	let isReplying = false

	function handleClickReply() {
		isReplying = true
	}

	function handleClickDelete() {
		publicApi.removeComment('https://remark42.com/demo/', comment.id)
	}
</script>

<div data-id={comment.id} class="comment" class:pinned={comment.pin}>
	<div class="content">
		{@html comment.text}
	</div>
	<div>
		{#if isReplying}
			<CommentForm pid={comment.id} />
		{:else}
			<Button on:click={handleClickReply}>Reply</Button>
			<div>
				<Button on:click={handleClickReply}>Hide</Button>
				<CommentAdminActions />
			</div>
		{/if}
	</div>
</div>

<style>
	.comment {
		width: 400px;
		border: 1px solid #ccc;
		margin-bottom: 10px;
	}

	.comment :global(img) {
		max-width: 100%;
	}

	.pinned {
		background-color: #f0f0f0;
	}

	.content {
		padding: 2px 10px;
	}
</style>
