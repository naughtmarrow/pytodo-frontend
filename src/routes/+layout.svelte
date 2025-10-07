<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import "../app.css";

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style>
  :global(body) {
    background-color: var(--global-background);
    background-image: var(--global-background-gradient);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    overflow: hidden;
    min-height: 100vh;
    width: 100vw;

    font-family: "Roboto", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings:
      "wdth" 100;
  }
</style>
