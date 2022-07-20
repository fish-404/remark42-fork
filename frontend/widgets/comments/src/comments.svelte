<script lang="ts">
	import PoweredByRemark42 from './components/powered-by-remark.svelte'
	import CommentForm from './components/comment-form.svelte'
	import User from './containers/user.svelte'
	import CommentsTree from './containers/comments-tree.svelte'
	import { fetchConfig } from './stores/config'

	fetchConfig()
</script>

<section class="root">
	<header style="color: red;">
		<User />
		<CommentForm />
	</header>
	<main>
		<CommentsTree />
	</main>
	<footer class="footer">
		<PoweredByRemark42 />
	</footer>
</section>

<style>
	.root {
		font-family: system-ui;
	}
	.footer {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>
