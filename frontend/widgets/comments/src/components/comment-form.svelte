<script lang="ts">
  import { user } from '../stores/user.svelte';
  import Auth from './auth.svelte';
</script>

<section>
  <form />
  {#if $user === null}
    <Auth />
  {/if}
</section>
