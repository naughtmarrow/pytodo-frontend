<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import '../app.css'

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<h1>This is a global layout</h1>
{@render children?.()}

<style>
  :global(body) {
    background-color: var(--global-background);
    background-image: var(--global-background-gradient);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }

  h1 {
    color: var(--global-foreground);
  }
</style>
