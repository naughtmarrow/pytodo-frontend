<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import "../app.css";
import Navbar from "$lib/components/Navbar.svelte";

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<Navbar />
{@render children?.()}

<style>
  :global(body) {
    background-color: var(--global-background);
    background-image: var(--global-background-gradient);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
  }
</style>
