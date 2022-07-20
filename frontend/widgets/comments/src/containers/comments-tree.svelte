<script lang="ts">
	import CommentsTree from '../components/comments-tree.svelte'
	import { comments } from '../stores/comments'
</script>

{#if $comments === null}
	Loading comments...
{:else}
	Comments:
	<CommentsTree comments={$comments} />
{/if}
